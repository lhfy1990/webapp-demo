// react
import React from 'react';
// Fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// assets
import locale from './res/locale';
import AppContext from './res/AppContext';
import './Home.css';

function Home() {
  return (
    <div className="hero is-fullheight-with-navbar is-bold ">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            <TitleContent/>
          </h1>
          <h2 className="subtitle">
            <SubtitleContent/>
          </h2>
        </div>
      </div>
    </div>
  );
}

class TitleContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.MSGTITLE}</React.Fragment>
  }
}

class SubtitleContent extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.MSGSUBTITLE}</React.Fragment>
  }
}

export default Home;
