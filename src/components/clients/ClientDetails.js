import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import classnames from 'classnames';

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  balanceSubmit = e => {
    e.preventDefault();

    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;
    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };

    firestore.update({ collection: 'clients', doc: client.id }, clientUpdate);
    this.setState({ showBalanceUpdate: false });
  };

  deleteOnClick = () => {
    this.deleteClient();
  };

  deleteOnKey = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.deleteClient();
    }
  };

  deleteClient = () => {
    const { client, firestore, history } = this.props;
    firestore
      .delete({ collection: 'clients', doc: client.id })
      .then(history.push('/'));
  };

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = '';
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group mt-3">
            <div className="input-group-append">
              <label htmlFor="balanceUpdateAmount" className="input-group-text">
                Enter new balance
              </label>
            </div>
            <input
              type="text"
              id="balanceUpdateAmount"
              className="form-control"
              name="balanceUpdateAmount"
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (client) {
      return (
        <div>
          <h1>Client Details</h1>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link text-success">
                <span className="fas fa-arrow-circle-left">
                  {' '}
                  Back to Dashboard
                </span>
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button
                  onClick={this.deleteOnClick}
                  onKeyPress={this.deleteOnKey}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h2 className="card-header">
              {client.firstName} {client.lastName}
            </h2>
            <div className="card-body">
              <div className="row">
                <div className="col-md-7 col-sm-6">
                  <h3>
                    Client ID:{' '}
                    <span className="text-secondary">{client.id}</span>
                  </h3>
                </div>
                <div className="col-md-5 col-sm-6">
                  <div className="row">
                    <h3 className="mr-2">
                      Balance:{' '}
                      <span
                        className={classnames({
                          'text-danger': client.balance > 0,
                          'text-success': client.balance === 0,
                          'text-warning': client.balance < 0
                        })}
                      >
                        ${parseFloat(client.balance).toFixed(2)}
                      </span>
                    </h3>
                    <button
                      className="btn btn-outline-success pull-right"
                      type="button"
                      onClick={() =>
                        this.setState({
                          showBalanceUpdate: !this.state.showBalanceUpdate
                        })
                      }
                    >
                      <span className="fas fa-pencil-alt" /> Update Balance
                    </button>
                    {balanceForm}
                  </div>
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email: {client.email}
                </li>
                <li className="list-group-item">
                  Contact Phone: {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: 'clients',
      storeAs: 'client',
      doc: props.match.params.id
    }
  ]),
  connect((state, props) => ({
    client: state.firestore.ordered.client && state.firestore.ordered.client[0]
  }))
)(ClientDetails);
