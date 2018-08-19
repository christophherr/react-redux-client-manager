import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class Clients extends Component {
  state = {
    totalOwed: null
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      const totalOwed = clients.reduce((totalOwed, client) => {
        return totalOwed + parseFloat(client.balance);
      }, 0);

      return { totalOwed };
    }

    return null;
  }

  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;
    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                {' '}
                <span className="fas fa-users" /> Clients{' '}
              </h2>
            </div>
            <div className="col-md-6">
              <p
                className="text-right text-secondary"
                style={{ fontSize: '20px' }}
              >
                Total owed
                <span className="text-primary">
                  {' '}
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => {
                return (
                  <tr key={client.id}>
                    <td>
                      {client.firstName} {client.lastName}
                    </td>
                    <td>{client.email}</td>
                    <td>${parseFloat(client.balance).toFixed(2)}</td>
                    <td>
                      <Link
                        to={`/client/${client.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        <span className="fas fa-arrow-circle-right" /> Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.protoTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
