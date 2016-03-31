import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
//import { Link } from 'react-router-bootstrap';
import Helmet from 'react-helmet';
//import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { NavBar } from 'components';
import { routeActions } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

import mono from '../../theme/mono'

import {
  config as themeConfig,
  Footer,
  Container,
  Banner,
  Heading,
  Text
} from 'rebass'

@asyncConnect([{
  deferred: false,
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: routeActions.push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    rebass: PropTypes.object.isRequired
  }

  getChildContext = () => {
    return {
      rebass: Object.assign(
        {},
        themeConfig,
        mono, {
          theme: 'Mono'
        }
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user} = this.props;
    const style = require("./App.scss")

    return (
      <div className={style.app}>
        <Banner
          style={{
            minHeight: '75vh',
            paddingTop: 48,
            backgroundAttachment: 'fixed'
          }}
          backgroundImage='https://d262ilb51hltx0.cloudfront.net/max/2000/1*DZwdGMaeu-rvTroJYui6Uw.jpeg'>
          <Heading size={1} big children={config.app.title} />
            <Text children={config.app.description} />
        </Banner>
        <Helmet {...config.app.head} />
        <NavBar user={user} />
        <Container>
          {this.props.children}
        </Container>
        <Footer>
          Dervos™ ©2016 Reinhard
        </Footer>
      </div>
    );
  }
}
