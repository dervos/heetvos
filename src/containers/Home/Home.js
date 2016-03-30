import React, { Component } from 'react';
import { Link } from 'react-router';
import config from '../../config';
import Helmet from 'react-helmet';

import { Banner, Heading, Text } from 'rebass';

// backgroundImage='https://d262ilb51hltx0.cloudfront.net/max/2000/1*DZwdGMaeu-rvTroJYui6Uw.jpeg'>

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Helmet title="Home" />
        <Banner
          style={{
            minHeight: '75vh',
            paddingTop: 48,
            backgroundAttachment: 'fixed'
          }}>
          <Heading size={1} big children={config.app.title} />
            <Text children={config.app.description} />
        </Banner>
      </div>
    );
  }
}
