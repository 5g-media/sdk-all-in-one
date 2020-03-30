import React from 'react';
import { connect } from 'react-redux';

import { Col } from 'reactstrap';
import Page from 'components/Page';
import {
  resizeTerminal,
  createTerminal,
  createTerminalSession,
  openTerminalSession,
} from 'utils/termUtils';
import * as osmActions from 'actions/osmActions';
import { getConfig } from '../utils/configUtils';

class OsmcliPage extends React.Component {
  async componentDidMount() {
    const { osm } = this.props;
    const term = await createTerminal({ termElm: this.termElm });
    if (osm.processId === '') {
      const processId = await createTerminalSession({ type: 'osm' });
      const tmpTerm = await openTerminalSession({ term, type: 'osm', processId });
      this.term = tmpTerm;
      this.props.setProcessId({ processId });
    } else {
      const tmpTerm = await openTerminalSession({
        term,
        type: 'osm',
        processId: osm.processId,
      });
      this.term = tmpTerm;
    }
  }

  componentDidUpdate = async prevProps => {
    if (prevProps.osm.processId !== this.props.osm.processId) {
      const configRes = await getConfig();
      const { config } = configRes;

      const currConfig =
        localStorage.getItem('isAdmin') === 'true' ? config.admin : config.developer;
      const xtermServerIp = currConfig.leanOwCLI.leanOW_IP;

      await resizeTerminal({
        term: this.term,
        xtermServerIp,
        processId: this.props.osm.processId,
      });
    }
  };

  render() {
    return (
      <Page title="OSM CLI" breadcrumbs={[{ name: 'OSM Cli', active: true }]}>
        <Col>
          <div
            // eslint-disable-next-line no-return-assign
            ref={ref => (this.termElm = ref)}
            style={{ height: '85vh' }}
          />
        </Col>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    osm: state.osm,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setProcessId: ({ processId }) => dispatch(osmActions.setProcessId({ processId })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OsmcliPage);
