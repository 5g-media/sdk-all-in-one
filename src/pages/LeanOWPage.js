import React from 'react';
import { connect } from 'react-redux';

import { Col } from 'reactstrap';
import Page from 'components/Page';
import {
  // getTerminal,
  resizeTerminal,
  createTerminal,
  createTerminalSession,
  openTerminalSession,
} from 'utils/termUtils';

import * as leanowActions from 'actions/leanowActions';
import { getConfig } from '../utils/configUtils';

class LeanOWPage extends React.Component {
  async componentDidMount() {
    const { leanow } = this.props;
    const term = await createTerminal({ termElm: this.termElm });
    if (leanow.processId === '') {
      const processId = await createTerminalSession({ type: 'leanow' });
      const tmpTerm = await openTerminalSession({ term, type: 'leanow', processId });
      this.term = tmpTerm;
      this.props.setProcessId({ processId });
    } else {
      const tmpTerm = await openTerminalSession({
        term,
        type: 'leanow',
        processId: leanow.processId,
      });
      this.term = tmpTerm;
    }
  }

  componentDidUpdate = async prevProps => {
    if (prevProps.leanow.processId !== this.props.leanow.processId) {
      const configRes = await getConfig();
      const { config } = configRes;

      const currConfig =
        localStorage.getItem('isAdmin') === 'true' ? config.admin : config.developer;
      const xtermServerIp = currConfig.leanOwCLI.leanOW_IP;

      await resizeTerminal({
        term: this.term,
        xtermServerIp,
        processId: this.props.leanow.processId,
      });
    }
  };

  render() {
    return (
      <Page title="LeanOW CLI" breadcrumbs={[{ name: 'LeanOW Cli', active: true }]}>
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
    leanow: state.leanow,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setProcessId: ({ processId }) => dispatch(leanowActions.setProcessId({ processId })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeanOWPage);
