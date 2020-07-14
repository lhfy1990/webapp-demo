// react
import React from 'react';
// Fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// assets
import locale from './res/locale';
import AppContext from './res/AppContext';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container level">
        <div className="level-left">
          <FooterContent/>
        </div>
        <div className="level-right">
          <ReturnTopButton/>
        </div>
      </div>
    </footer>
  );
}

class FooterContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <p>{locale.MSGCPRT}</p>;
  }
}

class ReturnTopButton extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <button className="button">{locale.BTNRTNTOP}</button>;
  }
}

export default Footer;
