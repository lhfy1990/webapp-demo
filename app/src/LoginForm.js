// react
import React from 'react';
// Fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// assets
import locale from './res/locale';
import AppContext from './res/AppContext';
import './LoginForm.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMissingUsername: false,
      isMissingPassword: false
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleClickSignIn = this.handleClickSignIn.bind(this);
  }

  onUsernameChange(event) {
    this.setState({
      username: event.target.value,
      isMissingUsername: !event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value,
      isMissingPassword: !event.target.value
    });
  }

  handleClickSignIn(event) {
    event.preventDefault();
    if (!this.state.username || !this.state.password) {
      this.setState({
        isMissingUsername: !this.state.username,
        isMissingPassword: !this.state.password
      });
      return;
    }
    let auth = {
      username: this.state.username,
      password: this.state.password
    };
    return this.props.handleClickSignIn(auth, event);
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
              autoComplete="current-password"
              onChange={this.onPasswordChange}/>
          </div>
        </div>
        <div className="field is-grouped">
          <p className="control is-expanded">
            <button
              className="button is-success"
              type="submit"
              onClick={this.handleClickSignIn}>
              <SignInLabelContent/>
            </button>
          </p>
          <p className="control">
            <button
              className="button is-text"
              onClick={(e) => this.props.handleClickToggle(e)}>
              <GotoSignUpLabelContent/>
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

class SignInLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.BTNSIGNIN}</React.Fragment>;
  }
}

class GotoSignUpLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.BTNGOTOSIGNUP}</React.Fragment>;
  }
}

class RequestFailedLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.MSGREQUESTFAILED}</React.Fragment>;
  }
}

export default LoginForm;
