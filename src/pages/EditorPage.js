import React, { Component } from 'react';

import Page from 'components/Page';
import { getConfig } from 'utils/configUtils';

import 'pages/additionalStyles/styles.css';
import { editor } from 'constants/clientConfig';

export default class EditorPage extends Component {
  constructor(props) {
    super(props);
    this.state = { editorUrl: '' };
  }

  async componentDidMount() {
    const configRes = await getConfig();
    const { config } = configRes;

    const configg = localStorage.getItem('isAdmin') === 'true' ? config.admin : config.developer;
    const editorUrl =
      configg !== undefined
        ? editor({
            editorUrl: configg.editor.editor_url || '',
            editorPort: configg.editor.editor_port || '',
          }).editorUrl
        : '';
    this.setState({ editorUrl });
  }

  renderPage = () => {
    return (
      <a href={this.state.editorUrl} target="export default _blank">
        Open OSM in a New Tab
      </a>
    );
  };

  render() {
    return <Page>{this.renderPage()}</Page>;
  }
}
