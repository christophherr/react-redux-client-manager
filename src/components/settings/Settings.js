import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from '../../actions/settingsActions';

class Settings extends Component {
  disableBalanceOnAddChange = () => this.props.setDisableBalanceOnAdd();
  disableBalanceOnEditChange = () => this.props.setDisableBalanceOnEdit();
  allowRegistrationChange = () => this.props.setAllowRegistration();

  render() {
    const {
      allowRegistration,
      disableBalanceOnAdd,
      disableBalanceOnEdit
    } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link text-success">
              <span className="fas fa-arrow-circle-left mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2>Edit Settings</h2>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="allowRegistration"
                    id="allowRegistration"
                    checked={!!allowRegistration}
                    onChange={this.allowRegistrationChange}
                  />{' '}
                  <label
                    className="form-check-label"
                    htmlFor="allowRegistration"
                  >
                    Allow Registration
                  </label>
                </div>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="disableBalanceOnAdd"
                    id="disableBalanceOnAdd"
                    checked={!!disableBalanceOnAdd}
                    onChange={this.disableBalanceOnAddChange}
                  />{' '}
                  <label
                    className="form-check-label"
                    htmlFor="disableBalanceOnAdd"
                  >
                    Disable Balance on Add
                  </label>
                </div>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="disableBalanceOnEdit"
                    id="disableBalanceOnEdit"
                    checked={!!disableBalanceOnEdit}
                    onChange={this.disableBalanceOnEditChange}
                  />{' '}
                  <label
                    className="form-check-label"
                    htmlFor="disableBalanceOnEdit"
                  >
                    Disable Balance on Edit
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setAllowRegistration: PropTypes.func.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  {
    setAllowRegistration,
    setDisableBalanceOnAdd,
    setDisableBalanceOnEdit
  }
)(Settings);
