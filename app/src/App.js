// react
import React from 'react';

// router
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

// Bulma
import './lib/Bulma';

// Fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// assets
import logo from './res/logo.svg';
import locale from './res/locale';
import AppContext from './res/AppContext';
import Request from './res/Request';
import './App.css';
import Footer from './Footer';
import Home from './Home';
import Me from './Me';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: {
        locale: locale.cn,
        request: new Request(),
        profile: undefined,
        setProfile: this.setProfile.bind(this)
      }
    };
  }

  setProfile(profile) {
    let context = this.state.context;
    context.profile = !profile
      ? undefined
      : profile;
    this.setState({context: context});
  }

  render() {
    return (
      <AppContext.Provider value={this.state.context}>
        <div className="app">
          <NavRouter/>
          <Footer/>
        </div>
      </AppContext.Provider>
    );
  }
}

class NavRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBurgerExpended: false
    };
    this.handleClickBurger = this.handleClickBurger.bind(this);
  }

  handleClickBurger(e) {
    e.preventDefault();
    this.setState({
      isBurgerExpended: !this.state.isBurgerExpended
    });
  }

  render() {
    let classNames = {};
    classNames['navbar-burger'] = this.state.isBurgerExpended
      ? 'navbar-burger is-active'
      : 'navbar-burger';
    classNames['navbar-menu'] = this.state.isBurgerExpended
      ? 'navbar-menu is-active'
      : 'navbar-menu';
    return (
      <Router>
        <nav className="navbar is-link is-fixed-top">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <img src={logo} alt="logo" height="28" width="28"/>
            </Link>
            <a
              className={classNames['navbar-burger']}
              href="/#"
              role="button"
              aria-label="menu"
              aria-expanded="false"
              onClick={this.handleClickBurger}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={classNames['navbar-menu']}>
            <div className="navbar-start">
              <Link className="navbar-item" to="/">
                <NavHome/>
              </Link>
              <Link className="navbar-item" to="/me">
                <NavMe/>
              </Link>
            </div>
            <div className="navbar-end"></div>
          </div>
        </nav>
        <section className="app-body">
          <Switch>
            <Route path="/" exact={true}>
              <Home/>
            </Route>
            <Route path="/me" exact={true}>
              <Me/>
            </Route>
          </Switch>
        </section>
      </Router>
    );
  }
}

class NavHome extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.NAVHOME}</React.Fragment>;
  }
}
class NavMe extends React.Component {
  static contextType = AppContext;
  render() {
    let locale = this.context.locale;
    return <React.Fragment>{locale.NAVME}</React.Fragment>;
  }
}

export default App;
