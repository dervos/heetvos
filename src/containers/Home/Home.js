import React, { Component } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import Helmet from 'react-helmet';

import { Banner, Heading, Text } from 'rebass';


export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Helmet title="Home" />
      </div>
    );
  }
}
