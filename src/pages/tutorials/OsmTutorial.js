import React from 'react';
import { Col, Row } from 'reactstrap';

import InstructionCard from 'components/InstructionCard';

import { osmInstructions } from 'constants/instructions/osmInstructions';
import { getTerminal } from 'utils/termUtils';
import { getConfig } from 'utils/configUtils';

export default class OsmTutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processId: '',
      serviceIp: '',
    };
  }

  async componentDidMount() {
    const configRes = await getConfig();
    const { config } = configRes;

    const configg =
      localStorage.getItem('isAdmin') === 'true'
        ? config.admin
        : config.developer;
    this.setState({ serviceIp: configg.editor.editor_url });

    const res = await getTerminal(this.termElm, 'osm');
    this.term = res.term;
    this.setState({ processId: res.processId });
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm="3" style={{ height: '85vh', overflowY: 'scroll' }}>
            {osmInstructions.map(ins => (
              <InstructionCard
                serviceIp={this.state.serviceIp}
                title={ins.title}
                buttonText={ins.buttonText}
                cardText1={ins.cardText1}
                cardText2={ins.cardText2}
                cardText3={ins.cardText3}
                buttonText2={ins.buttonText2}
                onCommandClick={ins.buttonText}
                onSecondCommandClick={ins.buttonText2}
                processId={this.state.processId}
                key={ins.title}
              />
            ))}
          </Col>
          <Col sm="9">
            <div
              style={{
                padding: '10px',
                paddingBottom: '10px',
                width: '100%',
                height: '100%',
              }}
              // eslint-disable-next-line no-return-assign
              ref={ref => (this.termElm = ref)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
