// react
import React from 'react';
// Fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// assets
import locale from './res/locale';
import AppContext from './res/AppContext';
import './Me.css';
import AuthForm from './AuthForm';
import ProfileCard from './ProfileCard';

class Me extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      isRequestFailed: false
    };

    this.handleClickSignIn = this.handleClickSignIn.bind(this);
    this.handleClickSignUp = this.handleClickSignUp.bind(this);
    this.handleClickSignOut = this.handleClickSignOut.bind(this);
    this.handleClickUpdate = this.handleClickUpdate.bind(this);
  }

  handleClickSignOut(event) {
    event.preventDefault();
    this.context.request.endSession();
    this.context.setProfile(undefined);
  }

  handleClickUpdate(profile, event) {
    event.preventDefault();
    let $set = {};
    let isPasswordChange = false;
    Object.keys(profile).forEach(key => {
      if (profile[key]) {
        $set[key] = profile[key];
        if (key === 'password') {
          isPasswordChange = true;
        }
      }
    });
    this.context.request.userPutById(this.context.profile._id, {$set: $set}).then(
      () => {
        this.setState({isRequestFailed: false});
        if (isPasswordChange) {
          this.context.request.endSession();
          this.context.setProfile(undefined);
          window.history.pushState({
            v: 1
          }, '');
        }
      }
    ).catch(err => {
      this.setState({isRequestFailed: true});
    });
  }

  handleClickSignIn(credential, event) {
    event.preventDefault();
    this.context.request.login(credential).then(data => {
      console.log(data);
      this.context.setProfile(data);
      this.setState({isRequestFailed: false});
    }).catch(err => {
      console.log(err);
      this.context.setProfile(undefined);
      this.setState({isRequestFailed: true});
    });
  }

  handleClickSignUp(credential, event) {
    event.preventDefault();
    this.context.request.signup(credential).then(data => {
      this.context.setProfile(data);
      this.setState({isRequestFailed: false});
    }).catch(err => {
      this.context.setProfile(undefined);
      this.setState({isRequestFailed: true});
    });
  }

  render() {
    if (!this.context.profile) {
      return (
        <div className="container">
          <div className="columns is-centered">
            <AuthForm
              isRequestFailed={this.state.isRequestFailed}
              handleClickSignIn={this.handleClickSignIn}
              handleClickSignUp={this.handleClickSignUp}/>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="columns is-centered">
          <ProfileCard
            handleClickSignOut={this.handleClickSignOut}
            handleClickUpdate={this.handleClickUpdate}/>
        </div>
      </div>
    );
  }
}

export default Me;
