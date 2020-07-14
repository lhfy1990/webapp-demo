// react
import React from 'react';
// Fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// assets
import locale from './res/locale';
import AppContext from './res/AppContext';
import './AuthForm.css';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: true
    };

    this.handleClickToggle = this.handleClickToggle.bind(this);
  }

  handleClickToggle(event) {
    event.preventDefault();
    this.setState({
      isSignIn: !this.state.isSignIn
    });
  }

  render() {
    if (this.state.isSignIn) {
      return (
        <LoginForm
          isRequestFailed={this.props.isRequestFailed}
          handleClickToggle={this.handleClickToggle}
          handleClickSignIn={this.props.handleClickSignIn}/>
      );
    }
    return (
      <RegistrationForm
        isRequestFailed={this.props.isRequestFailed}
        handleClickToggle={this.handleClickToggle}
        handleClickSignUp={this.props.handleClickSignUp}/>
    );
  }
}

export default AuthForm;
