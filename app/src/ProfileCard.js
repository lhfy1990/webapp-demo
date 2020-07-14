// react
import React from 'react';
// Fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// assets
import locale from './res/locale';
import AppContext from './res/AppContext';
import './ProfileCard.css';

class ProfileCard extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      isPasswordChange: false
    };

    this.handleClickToggle = this.handleClickToggle.bind(this);
  }

  handleClickToggle(event) {
    event.preventDefault();
    this.setState({
      isPasswordChange: !this.state.isPasswordChange
    });
  }

  render() {
    if (!this.context.profile) {
      return (<></>);
    }
    if (this.state.isPasswordChange) {
      return (
        <PasswordChangeForm
          isRequestFailed={this.props.isRequestFailed}
          handleClickToggle={this.handleClickToggle}
          handleClickUpdate={this.props.handleClickUpdate}
          handleClickSignOut={this.props.handleClickSignOut}/>
      );
    }
    return (
      <ProfileChangeForm
        isRequestFailed={this.props.isRequestFailed}
        handleClickToggle={this.handleClickToggle}
        handleClickUpdate={this.props.handleClickUpdate}
        handleClickSignOut={this.props.handleClickSignOut}/>
    );
  }
}

class PasswordChangeForm extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      isMissingCurrentPassword: false,
      isMissingNewPassword: false,
      isPasswordConfirmed: true
    };

    this.onCurrentPasswordChange = this.onCurrentPasswordChange.bind(this);
    this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.handleClickUpdate = this.handleClickUpdate.bind(this);
  }

  onCurrentPasswordChange(event) {
    this.setState({
      currentPassword: event.target.value,
      isMissingCurrentPassword: !event.target.value
    });
  }

  onNewPasswordChange(event) {
    this.setState({
      newPassword: event.target.value,
      isMissingNewPassword: !event.target.value,
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

  handleClickUpdate(event) {
    event.preventDefault();
    if (!this.state.newPassword || !this.state.currentPassword || !this.state.isPasswordConfirmed) {
      this.setState({
        isMissingCurrentPassword: !this.state.currentPassword,
        isMissingNewPassword: !this.state.newPassword
      });
      return;
    }
    let profile = {
      password: this.state.newPassword,
      oldPassword: this.state.currentPassword
    };
    return this.props.handleClickUpdate(profile, event);
  }

  render() {
    return (
      <form className="card">
        <div className="card-content">
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
            <input
              className="input"
              type="text"
              autoComplete="username"
              disabled="disabled"
              value={this.context.profile.username}/>
          </div>
          <div className="field">
            <label className="label">
              <CurrentPasswordLabelContent/>
            </label>
            <input
              className={this.state.isMissingCurrentPassword
                ? 'input is-danger'
                : 'input'}
              type="password"
              autoComplete="current-password"
              onChange={this.onCurrentPasswordChange}/>
          </div>
          <div className="field">
            <label className="label">
              <NewPasswordLabelContent/>
            </label>
            <input
              className={this.state.isMissingNewPassword
                ? 'input is-danger'
                : 'input'}
              type="password"
              autoComplete="new-password"
              onChange={this.onNewPasswordChange}/>
          </div>
          <div className="field">
            <label className="label">
              <ConfirmPasswordLabelContent/>
            </label>
            <input
              className={this.state.isPasswordConfirmed
                ? 'input'
                : 'input is-danger'}
              type="password"
              autoComplete="new-password"
              onChange={this.onConfirmPasswordChange}/>
          </div>
        </div>
        <footer className="card-footer">
          <p className="card-footer-item control">
            <button
              className="button is-success"
              type="submit"
              onClick={this.handleClickUpdate}>
              <UpdateLabelContent/>
            </button>
          </p>
          <p className="card-footer-item control">
            <button className="button is-danger" onClick={this.props.handleClickSignOut}>
              <SignOutLabelContent/>
            </button>
          </p>
          <p className="card-footer-item control">
            <button className="button is-text" onClick={this.props.handleClickToggle}>
              <GotoChangeProfileLabelContent/>
            </button>
          </p>
        </footer>
      </form>
    );
  }
}

class ProfileChangeForm extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {};

    this.onNameChange = this.onNameChange.bind(this);
    this.handleClickUpdate = this.handleClickUpdate.bind(this);
  }

  onNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleClickUpdate(event) {
    event.preventDefault();
    let profile = {
      name: this.state.name
    };
    return this.props.handleClickUpdate(profile, event);
  }

  render() {
    return (
      <form className="card">
        <div className="card-content">
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
            <input
              className="input"
              type="text"
              disabled="disabled"
              value={this.context.profile.username}/>
          </div>
          <div className="field">
            <label className="label">
              <NameLabelContent/>
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                autoComplete="off"
                onChange={this.onNameChange}/>
            </div>
          </div>
        </div>
        <footer className="card-footer">
          <p className="card-footer-item control">
            <button
              className="button is-success"
              type="submit"
              onClick={this.handleClickUpdate}>
              <UpdateLabelContent/>
            </button>
          </p>
          <p className="card-footer-item control">
            <button className="button is-danger" onClick={this.props.handleClickSignOut}>
              <SignOutLabelContent/>
            </button>
          </p>
          <p className="card-footer-item control">
            <button className="button is-text" onClick={this.props.handleClickToggle}>
              <GotoChangePasswordLabelContent/>
            </button>
          </p>
        </footer>
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

class CurrentPasswordLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.LBLCRNTPASSWORD}</React.Fragment>;
  }
}

class NewPasswordLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.LBLNEWPASSWORD}</React.Fragment>;
  }
}

class ConfirmPasswordLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.LBLCNFMPASSWORD}</React.Fragment>;
  }
}

class NameLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.LBLNAME}</React.Fragment>;
  }
}

class SignOutLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.BTNSIGNOUT}</React.Fragment>;
  }
}

class UpdateLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.BTNPROFILEUPDATE}</React.Fragment>;
  }
}

class GotoChangePasswordLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.BTNGOTOCHANGEPASSWORD}</React.Fragment>;
  }
}

class GotoChangeProfileLabelContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.BTNGOTOCHANGEPROFILE}</React.Fragment>;
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

export default ProfileCard;
