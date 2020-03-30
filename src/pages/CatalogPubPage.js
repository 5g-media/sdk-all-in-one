import React from 'react';

import Page from 'components/Page';
import { catalogue } from 'constants/clientConfig';
import { getConfig } from 'utils/configUtils';
import 'pages/additionalStyles/styles.css';

export default class CatalogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { catalogueUrl: '' };
  }

  async componentDidMount() {
    const configRes = await getConfig();
    const { config } = configRes;

    const configg = localStorage.getItem('isAdmin') === 'true' ? config.admin : config.developer;

    const catalogueUrl =
      configg !== undefined
        ? catalogue({
            privateCatalogueIP: configg.catalogue.catalogue_IP || '',
            privateCataloguePort: configg.catalogue.catalogue_port || '',
          }).catalogueUrl
        : '';

    this.setState({ catalogueUrl });
  }

  renderPage = () => {
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a href={this.state.catalogueUrl} target="_blank">
        Open Public Catalogue in a New Tab
      </a>
    );
  };

  render() {
    return <Page>{this.renderPage()}</Page>;
  }
}
