import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Input,
  Button,
  Col,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';

import Page from 'components/Page';
import LoadConfig from 'pages/Profiling/LoadConfig';
import ProfileType from 'pages/Profiling/ProfileType';
import ContainerLogs from 'pages/Profiling/ContainerLogs';

import { ipRegex, portRegex } from 'constants/validationRegexes';
import { getConfig } from 'utils/configUtils';

import * as profilingActions from 'actions/profilingActions';

class Profiling extends React.Component {
  constructor(props) {
    super(props);
    this.state = { configg: {} };
  }

  async componentDidMount() {
    const configRes = await getConfig();
    const { config } = configRes;

    const configg =
      localStorage.getItem('isAdmin') === 'true'
        ? config.admin
        : config.developer;
    this.setState({ configg });
  }

  onFormSubmit = async e => {
    e.preventDefault();
    this.props.clearLogs();

    this.props.startProfiler({
      state: this.props.profiling,
      config: this.state.configg,
    });
  };

  onIpAddressChange = e => {
    const rgx = ipRegex;

    this.props.setIpAddress({ ipAddress: e.target.value });

    if (rgx.test(e.target.value)) {
      this.props.setIpInvalidStatus({ ipInvalidStatus: false });
    } else {
      this.props.setIpInvalidStatus({ ipInvalidStatus: true });
    }
  };

  onPortChange = e => {
    const rgx = portRegex;
    if (rgx.test(e.target.value)) {
      const portConfig = {
        [e.target.name]: e.target.value,
        [`${e.target.name}InvalidStatus`]: false,
      };
      this.props.setPorts({ ...portConfig });
    } else {
      this.props.setInvalidStatus({ [`${e.target.name}InvalidStatus`]: true });
    }
  };

  serviceNameChange = ({ serviceName }) => {
    this.props.setServiceName({ serviceName });
  };

  getServiceConfig = () => {
    this.props.getServiceConfig({
      states: this.props.profiling,
      config: this.state.configg,
    });
  };

  profileTypeChange = type => {
    this.props.setProfilingType({ ...type });
  };

  setInputChange = e => {
    this.props.setInputChange({ [e.target.name]: e.target.value });
  };

  render() {
    const { profiling } = this.props;
    return (
      <Container>
        <Page
          title="Benchmarking"
          breadcrumbs={[{ name: 'Benchmarking', active: true }]}
        >
          <ProfileType profileTypeChange={this.profileTypeChange} />
          <LoadConfig
            serviceIp={this.state.configg}
            serviceName={profiling.serviceName}
            serviceNameChange={this.serviceNameChange}
            confLoading={profiling.confLoading}
            config={this.getServiceConfig}
            platform={profiling.platform}
            mode={profiling.mode}
          />
          <Form onSubmit={this.onFormSubmit}>
            <FormGroup row>
              <Label for="ipAddress" sm={2}>
                IP Address
              </Label>
              <Col>
                <Input
                  invalid={profiling.ipInvalidStatus}
                  type="ipadress"
                  name="ipAddress"
                  id="ipAddress"
                  placeholder="IP Address"
                  onChange={this.onIpAddressChange}
                  value={profiling.ipAddress}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Port" sm={2}>
                Port
              </Label>
              <Col>
                <Input
                  invalid={profiling.inputPortInvalidStatus}
                  type="text"
                  name="inputPort"
                  id="inputPort"
                  placeholder="Port #1"
                  onChange={this.onPortChange}
                  value={profiling.inputPort}
                />
              </Col>
              <Col>
                <Input
                  invalid={profiling.outputPortInvalidStatus}
                  type="text"
                  name="outputPort"
                  id="outputPort"
                  placeholder="Port #2"
                  onChange={this.onPortChange}
                  value={profiling.outputPort}
                />
              </Col>
              <Col>
                <Input
                  invalid={profiling.configPortInvalidStatus}
                  type="text"
                  name="configPort"
                  id="configPort"
                  placeholder="Port #3"
                  onChange={this.onPortChange}
                  value={profiling.configPort}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="frameToSend" sm={2}>
                Frame To Send
              </Label>
              <Col>
                <Input
                  type="number"
                  name="frameToSend"
                  id="frameToSend"
                  placeholder="Frame To Send (Default 20)"
                  value={profiling.frameToSend}
                  onChange={this.setInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="stepCount" sm={2}>
                Instance Count
              </Label>
              <Col>
                <Input
                  type="number"
                  name="stepCount"
                  id="stepCount"
                  placeholder="Instance Count (Default 1)"
                  value={profiling.stepCount}
                  onChange={this.setInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Button
                disabled={profiling.loading}
                style={{ width: '100%' }}
                size="lg"
              >
                Start Media Traffic
              </Button>
            </FormGroup>
          </Form>
          <ContainerLogs logs={profiling.logs} />
        </Page>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    profiling: state.profiling,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearLogs: () => dispatch(profilingActions.clearLogs()),
    setServiceName: ({ serviceName }) =>
      dispatch(profilingActions.setServiceName({ serviceName })),
    setPorts: ({ ...portConfig }) =>
      dispatch(profilingActions.setPorts({ ...portConfig })),
    setInvalidStatus: ({ ...status }) =>
      dispatch(profilingActions.setInvalidStatus({ ...status })),
    setIpAddress: ({ ipAddress }) =>
      dispatch(profilingActions.setIpAddress({ ipAddress })),
    setIpInvalidStatus: ({ ipInvalidStatus }) =>
      dispatch(profilingActions.setIpInvalidStatus({ ipInvalidStatus })),
    setProfilingType: ({ ...type }) =>
      dispatch(profilingActions.setProfilingType({ ...type })),
    getServiceConfig: ({ states, config }) =>
      dispatch(profilingActions.getServiceConfig({ states, config })),
    setInputChange: ({ ...inputs }) =>
      dispatch(profilingActions.setInputChange({ ...inputs })),
    startProfiler: ({ state, config }) =>
      dispatch(profilingActions.startProfiler({ state, config })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profiling);
