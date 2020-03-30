import React from 'react';

import Page from 'components/Page';

import { monitoring } from 'constants/clientConfig';
import { getConfig } from 'utils/configUtils';

import 'pages/additionalStyles/styles.css';

export default class MonitorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monitoringUrl: '',
    };
  }

  async componentDidMount() {
    const configRes = await getConfig();
    const { config } = configRes;

    const configg = localStorage.getItem('isAdmin') === 'true' ? config.admin : config.developer;
    const monitoringUrl =
      configg !== undefined
        ? monitoring({
            monitoringUrl: configg.serviceMonitoring.monitor_dashboard_URL,
            monitoringPort: configg.serviceMonitoring.monitor_dashboard_port,
          }).monitoringUrl
        : '';

    this.setState({ monitoringUrl });
  }

  renderPage = () => {
    return (
      <iframe
        title="monitoring"
        src={this.state.monitoringUrl}
        style={{ height: '92vh', width: '100%' }}
      />
    );
  };

  render() {
    return (
      <Page>
        <div className="holds-the-iframe">{this.renderPage()}</div>
      </Page>
    );
  }
}
