// react
import React from 'react';
// Fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// assets
import locale from './res/locale';
import AppContext from './res/AppContext';
import './RegistrationForm.css';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMissingUsername: false,
      isMissingPassword: false,
      isPasswordConfirmed: true
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.handleClickSignUp = this.handleClickSignUp.bind(this);
  }

  onUsernameChange(event) {
    this.setState({
      username: event.target.value,
      isMissingUsername: !event.target.value
    });
  }

  onNewPasswordChange(event) {
    this.setState({
      newPassword: event.target.value,
      isMissingPassword: !event.target.value,
      confirmPassword: undefined,
      isPasswordConfirmed: false
    });
  }

  onConfirmPasswordChange(event) {
    this.setState({
      confirmPassword: event.target.value,
      isPasswordConfirmed: this.state.newPassword === event.target.value
    });
  }

  handleClickSignUp(event) {
    event.preventDefault();
    if (!this.state.username || !this.state.newPassword || !this.state.isPasswordConfirmed) {
      this.setState({
        isMissingUsername: !this.state.username,
        isMissingPassword: !this.state.newPassword
      });
      return;
    }
    let auth = {
      username: this.state.username,
      password: this.state.newPassword
    };
    return this.props.handleClickSignUp(auth, event);
  }

  render() {
    return (
      <form className="column is-half">
        {
          this.props.isRequestFailed
            ? <p className="help is-danger">*
                <RequestFailedLabelContent/></p>
            : <React.Fragment></React.Fragment>
        }
        <div className="field">
          <label className="label">
            <UsernameLabelContent/>
          </label>
          <div className="control">
            <input
              className={this.state.isMissingUsername
                ? 'input is-danger'
                : 'input'}
              type="text"
              autoComplete="username"
              onChange={this.onUsernameChange}/>
          </div>
        </div>
        <div className="field">
          <label className="label">
            <PasswordLabelContent/>
          </label>
          <div className="control">
            <input
              className={this.state.isMissingPassword
                ? 'input is-danger'
                : 'input'}
              type="password"
              autoComplete="new-password"
              onChange={this.onNewPasswordChange}/>
          </div>
        </div>
        <div className="field">
          <label className="label">
            <ConfirmPasswordLabelContent/>
          </label>
          <div className="control">
            <input
              className={this.state.isPasswordConfirmed
                ? 'input'
                : 'input is-danger'}
              type="password"
              autoComplete="new-password"
              onChange={this.onConfirmPasswordChange}/>
          </div>
        </div>
        <div className="field is-grouped">
          <p className="control is-expanded">
            <button
              className="button is-success"
              type="submit"
              onClick={this.handleClickSignUp}>
              <SignUpLabelContent/>
            </button>
          </p>
          <p className="control">
            <button
              className="button is-text"
              onClick={(e) => this.props.handleClickToggle(e)}>
              <GotoSignInLabelContent/>
            </button>
          </p>
        </div>
      </form>
    );
  }
}

class UsernameLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.LBLUSERNAME}</React.Fragment>;
  }
}

class PasswordLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.LBLPASSWORD}</React.Fragment>;
  }
}

class ConfirmPasswordLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.LBLCNFMPASSWORD}</React.Fragment>;
  }
}

class SignUpLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.BTNSIGNUP}</React.Fragment>;
  }
}

class GotoSignInLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.BTNGOTOSIGNIN}</React.Fragment>;
  }
}

class RequestFailedLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    console.log(this.context);
    return <React.Fragment>{locale.MSGREQUESTFAILED}</React.Fragment>;
  }
}

export default RegistrationForm;
