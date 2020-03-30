import React, { Component } from 'react';
import Page from 'components/Page';
import { getConfig } from '../utils/configUtils';

export default class VimemuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configg: {},
    };
  }

  async componentDidMount() {
    const configRes = await getConfig();
    const { config } = configRes;

    const configg = localStorage.getItem('isAdmin') === 'true' ? config.admin : config.developer;
    this.setState({ configg });
  }

  render() {
    return (
      <Page>
        <div>
          <webview src={this.state.configg.emulator.dashboardURL} style={{ height: '90vh' }} />
        </div>
      </Page>
    );
  }
}
