import React from 'react';
import {
  Alert,
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Jumbotron,
} from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { MdArrowBack } from 'react-icons/lib/md';

import { setConfiguration } from 'api/service/configurationService';
import { getConfig } from 'utils/configUtils';

export default class ConfigPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminEditorURL: '',
      adminEditorPort: '',
      adminCatalogIP: '',
      adminCatalogPort: '',
      adminCatalogAuthServerIP: '',
      adminCatalogAuthServerPort: '',
      adminCatalogFQDN: '',
      adminCatalogAuthServerFQDN: '',
      adminMonitoringURL: '',
      adminMonitoringPort: '',
      adminTrainingURL: '',
      adminTrainingPort: '',
      devPrivateCatalogIP: '',
      devPrivateCatalogPort: '',
      leanUsername: '',
      leanPass: '',
      leanIP: '',
      osmUsername: '',
      osmPass: '',
      devEditorURL: '',
      devEditorPort: '',
      devMonitoringURL: '',
      devMonitoringPort: '',
      mapeURL: '',
      gitlabToken: '',
      validationService: '',
      showAlert: false,
    };
  }

  async componentDidMount() {
    const configRes = await getConfig();
    this.setState({
      alertText: configRes.alertText,
      showAlert: configRes.showAlert,
      error: configRes.error,
      success: configRes.success,
    });
    const { config } = configRes;

    if (Object.entries(config).length === 0) {
      return;
    }

    this.setState({
      adminEditorURL: config.admin.editor.editor_url,
      adminEditorPort: config.admin.editor.editor_port,
      adminCatalogIP: config.admin.catalogue.catalogue_IP,
      adminCatalogPort: config.admin.catalogue.catalogue_port,
      adminCatalogAuthServerIP: config.admin.catalogue.catalogue_auth_server_IP,
      adminCatalogAuthServerPort:
        config.admin.catalogue.catalogue_auth_server_port,
      adminCatalogFQDN: config.admin.catalogue.catalogue_FQDN,
      adminCatalogAuthServerFQDN:
        config.admin.catalogue.catalogue_auth_server_FQDN,
      adminMonitoringURL: config.admin.serviceMonitoring.monitor_dashboard_URL,
      adminMonitoringPort:
        config.admin.serviceMonitoring.monitor_dashboard_port,
      adminTrainingURL: config.admin.serviceTraining.training_dashboard_URL,
      adminTrainingPort: config.admin.serviceTraining.training_dashboard_port,

      devPrivateCatalogIP: config.developer.catalogue.catalogue_IP,
      devPrivateCatalogPort: config.developer.catalogue.catalogue_port,
      devEditorURL: config.developer.editor.editor_url,
      devEditorPort: config.developer.editor.editor_port,
      devMonitoringURL:
        config.developer.serviceMonitoring.monitor_dashboard_URL,
      devMonitoringPort:
        config.developer.serviceMonitoring.monitor_dashboard_port,
      leanUsername: config.developer.leanOwCLI.username,
      leanPass: config.developer.leanOwCLI.password,
      leanIP: config.developer.leanOwCLI.leanOW_IP,
      osmUsername: config.developer.osmCLI.username,
      osmPass: config.developer.osmCLI.password,
      mapeURL: config.developer.mape.mapeURL,
      gitlabToken: config.developer.gitlab.gitlabToken,
      validationService: config.developer.validation.extract_service,
    });
  }

  onFormSubmit = async e => {
    e.preventDefault();

    const conf = {
      admin: {
        catalogue: {
          catalogue_IP: this.state.adminCatalogIP,
          catalogue_port: this.state.adminCatalogPort,
          catalogue_auth_server_IP: this.state.adminCatalogAuthServerIP,
          catalogue_auth_server_port: this.state.adminCatalogAuthServerPort,
          catalogue_FQDN: this.state.adminCatalogFQDN,
          catalogue_auth_server_FQDN: this.state.adminCatalogAuthServerFQDN,
        },
        editor: {
          editor_url: this.state.adminEditorURL,
          editor_port: this.state.adminEditorPort,
        },
        serviceMonitoring: {
          monitor_dashboard_URL: this.state.adminMonitoringURL,
          monitor_dashboard_port: this.state.adminMonitoringPort,
        },
        serviceTraining: {
          training_dashboard_URL: this.state.adminTrainingURL,
          training_dashboard_port: this.state.adminTrainingPort,
        },
      },
      developer: {
        catalogue: {
          catalogue_IP: this.state.devPrivateCatalogIP,
          catalogue_port: this.state.devPrivateCatalogPort,
        },
        editor: {
          editor_url: this.state.devEditorURL,
          editor_port: this.state.devEditorPort,
        },
        serviceMonitoring: {
          monitor_dashboard_URL: this.state.devMonitoringURL,
          monitor_dashboard_port: this.state.devMonitoringPort,
        },
        leanOwCLI: {
          username: this.state.leanUsername,
          password: this.state.leanPass,
          keyfile: 'Not supported yet',
          apihost: 'Not supported yet',
          auth: 'Not supported yet',
          leanOW_IP: this.state.leanIP,
        },
        osmCLI: {
          username: this.state.osmUsername,
          password: this.state.osmPass,
          keyfile: 'Not supported yet',
        },
        mape: {
          mapeURL: this.state.mapeURL,
        },
        gitlab: {
          gitlabToken: this.state.gitlabToken,
        },
        validation: {
          extract_service: this.state.validationService,
        },
      },
    };

    const res = await setConfiguration({
      conf,
      validationServiceIp: this.state.validationService,
    });

    if (res.errStatus === false) {
      this.setState({
        alertText: `Saved`,
        showAlert: true,
        error: false,
        success: true,
      });
    } else {
      this.setState({
        alertText: `Couldn't Saved ${res.data}`,
        showAlert: true,
        error: true,
        success: false,
      });
    }
  };

  onBackClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <Button
          style={{ position: 'absolute', marginTop: '1vh', marginLeft: '1vh' }}
          onClick={this.onBackClick}
        >
          <MdArrowBack size={50} />
        </Button>
        <Container>
          <Jumbotron className="bg-gradient-theme-left border-0">
            <h1 style={{ color: '#fff' }}>Configuration</h1>
          </Jumbotron>
          <Form onSubmit={this.onFormSubmit}>
            <Alert color="dark" className="bg-gradient-theme-left border-0">
              <h4 style={{ color: '#fff' }}>Admin</h4>
            </Alert>
            <FormGroup row>
              <Label for="adminEditorURL" sm={2}>
                Editor
              </Label>
              <Col sm={5}>
                <Input
                  type="text"
                  name="adminEditorURL"
                  id="adminEditorURL"
                  placeholder="Editor URL"
                  value={
                    this.state.adminEditorURL ? this.state.adminEditorURL : ''
                  }
                  onChange={e =>
                    this.setState({ adminEditorURL: e.target.value })
                  }
                />
              </Col>
              <Col sm={5}>
                <Input
                  type="text"
                  name="adminEditorPort"
                  id="adminEditorPort"
                  placeholder="Editor Port"
                  value={
                    this.state.adminEditorPort ? this.state.adminEditorPort : ''
                  }
                  onChange={e =>
                    this.setState({ adminEditorPort: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="adminCatalogIP" sm={2}>
                Public Catalog
              </Label>
              <Col sm={5}>
                <Input
                  type="text"
                  name="adminCatalogIP"
                  id="adminCatalogIP"
                  placeholder="Catalog IP"
                  value={
                    this.state.adminCatalogIP ? this.state.adminCatalogIP : ''
                  }
                  onChange={e =>
                    this.setState({ adminCatalogIP: e.target.value })
                  }
                />
              </Col>
              <Col sm={5}>
                <Input
                  type="text"
                  name="adminCatalogPort"
                  id="adminCatalogPort"
                  placeholder="Catalog Port"
                  value={
                    this.state.adminCatalogPort
                      ? this.state.adminCatalogPort
                      : ''
                  }
                  onChange={e =>
                    this.setState({ adminCatalogPort: e.target.value })
                  }
                />
              </Col>
              <Label for="adminCatalogAuthServer" sm={2} />
              <Col sm={5}>
                <Input
                  type="text"
                  name="adminCatalogAuthServerIP"
                  id="adminCatalogAuthServerIP"
                  placeholder="Auth Server IP"
                  value={
                    this.state.adminCatalogAuthServerIP
                      ? this.state.adminCatalogAuthServerIP
                      : ''
                  }
                  onChange={e =>
                    this.setState({ adminCatalogAuthServerIP: e.target.value })
                  }
                />
              </Col>
              <Col sm={5}>
                <Input
                  type="text"
                  name="adminCatalogAuthServerPort"
                  id="adminCatalogAuthServerPort"
                  placeholder="Auth Server Port"
                  value={
                    this.state.adminCatalogAuthServerPort
                      ? this.state.adminCatalogAuthServerPort
                      : ''
                  }
                  onChange={e =>
                    this.setState({
                      adminCatalogAuthServerPort: e.target.value,
                    })
                  }
                />
              </Col>
              <Label for="adminCatalogFQDN" sm={2} />
              <Col sm={5}>
                <Input
                  type="text"
                  name="adminCatalogFQDN"
                  id="adminCatalogFQDN"
                  placeholder="FQDN"
                  value={
                    this.state.adminCatalogFQDN
                      ? this.state.adminCatalogFQDN
                      : ''
                  }
                  onChange={e =>
                    this.setState({ adminCatalogFQDN: e.target.value })
                  }
                />
              </Col>
              <Col sm={5}>
                <Input
                  type="text"
                  name="adminCatalogAuthServerFQDN"
                  id="adminCatalogAuthServerFQDN"
                  placeholder="Auth Server FQDN Port"
                  value={
                    this.state.adminCatalogAuthServerFQDN
                      ? this.state.adminCatalogAuthServerFQDN
                      : ''
                  }
                  onChange={e =>
                    this.setState({
                      adminCatalogAuthServerFQDN: e.target.value,
                    })
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="adminMonitoringURL" sm={2}>
                Monitoring
              </Label>
              <Col sm={5}>
                <Input
                  type="text"
                  name="adminMonitoringURL"
                  id="adminMonitoringURL"
                  placeholder="Monitoring URL"
                  value={
                    this.state.adminMonitoringURL
                      ? this.state.adminMonitoringURL
                      : ''
                  }
                  onChange={e =>
                    this.setState({ adminMonitoringURL: e.target.value })
                  }
                />
              </Col>
              <Col sm={5}>
                <Input
                  type="text"
                  name="adminMonitoringPort"
                  id="adminMonitoringPort"
                  placeholder="Monitoring Port"
                  value={
                    this.state.adminMonitoringPort
                      ? this.state.adminMonitoringPort
                      : ''
                  }
                  onChange={e =>
                    this.setState({ adminMonitoringPort: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="adminTrainingURL" sm={2}>
                Training
              </Label>
              <Col sm={5}>
                <Input
                  type="text"
                  name="adminTrainingURL"
                  id="adminTrainingURL"
                  placeholder="Training URL"
                  value={
                    this.state.adminTrainingURL
                      ? this.state.adminTrainingURL
                      : ''
                  }
                  onChange={e =>
                    this.setState({ adminTrainingURL: e.target.value })
                  }
                />
              </Col>
              <Col sm={5}>
                <Input
                  type="text"
                  name="adminTrainingPort"
                  id="adminTrainingPort"
                  placeholder="Training Port"
                  value={
                    this.state.adminTrainingPort
                      ? this.state.adminTrainingPort
                      : ''
                  }
                  onChange={e =>
                    this.setState({ adminTrainingPort: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="mape" sm={2}>
                MAPE
              </Label>
              <Col>
                <Input
                  type="text"
                  name="mapeIP"
                  id="mapeIP"
                  placeholder="IP Address"
                  value={this.state.mapeURL ? this.state.mapeURL : ''}
                  onChange={e => this.setState({ mapeURL: e.target.value })}
                />
              </Col>
            </FormGroup>
            <Alert color="dark" className="bg-gradient-theme-left border-0">
              <h4 style={{ color: '#fff' }}>Developer</h4>
            </Alert>
            <FormGroup row>
              <Label for="devEditorURL" sm={2}>
                Editor
              </Label>
              <Col sm={5}>
                <Input
                  type="text"
                  name="devEditorURL"
                  id="devEditorURL"
                  placeholder="Editor URL"
                  value={this.state.devEditorURL ? this.state.devEditorURL : ''}
                  onChange={e =>
                    this.setState({ devEditorURL: e.target.value })
                  }
                />
              </Col>
              <Col sm={5}>
                <Input
                  type="text"
                  name="devEditorPort"
                  id="devEditorPort"
                  placeholder="Editor Port"
                  value={
                    this.state.devEditorPort ? this.state.devEditorPort : ''
                  }
                  onChange={e =>
                    this.setState({ devEditorPort: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="devPrivateCatalogIP" sm={2}>
                Private Catalog
              </Label>
              <Col sm={5}>
                <Input
                  type="text"
                  name="devPrivateCatalogIP"
                  id="devPrivateCatalogIP"
                  placeholder="Private Catalog IP"
                  value={
                    this.state.devPrivateCatalogIP
                      ? this.state.devPrivateCatalogIP
                      : ''
                  }
                  onChange={e =>
                    this.setState({ devPrivateCatalogIP: e.target.value })
                  }
                />
              </Col>
              <Col sm={5}>
                <Input
                  type="text"
                  name="devPrivateCatalogPort"
                  id="devPrivateCatalogPort"
                  placeholder="Private Catalog Port"
                  value={
                    this.state.devPrivateCatalogPort
                      ? this.state.devPrivateCatalogPort
                      : ''
                  }
                  onChange={e =>
                    this.setState({ devPrivateCatalogPort: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="devMonitoringURL" sm={2}>
                Monitoring
              </Label>
              <Col sm={5}>
                <Input
                  type="text"
                  name="devMonitoringURL"
                  id="devMonitoringURL"
                  placeholder="Monitoring URL"
                  value={
                    this.state.devMonitoringURL
                      ? this.state.devMonitoringURL
                      : ''
                  }
                  onChange={e =>
                    this.setState({ devMonitoringURL: e.target.value })
                  }
                />
              </Col>
              <Col sm={5}>
                <Input
                  type="text"
                  name="devMonitoringPort"
                  id="devMonitoringPort"
                  placeholder="Monitoring Port"
                  value={
                    this.state.devMonitoringPort
                      ? this.state.devMonitoringPort
                      : ''
                  }
                  onChange={e =>
                    this.setState({ devMonitoringPort: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="lean" sm={2}>
                Lean
              </Label>
              <Col>
                <Input
                  type="text"
                  name="leanIP"
                  id="leanIP"
                  placeholder="IP Address"
                  value={this.state.leanIP ? this.state.leanIP : ''}
                  onChange={e => this.setState({ leanIP: e.target.value })}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="gitlabToken" sm={2}>
                Gitlab Token
              </Label>
              <Col sm={10}>
                <Input
                  type="Text"
                  name="gitlabToken"
                  id="gitlabToken"
                  placeholder="Gitlab Token"
                  value={this.state.gitlabToken ? this.state.gitlabToken : ''}
                  onChange={e => this.setState({ gitlabToken: e.target.value })}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="gitlabToken" sm={2}>
                Validation Service
              </Label>
              <Col sm={10}>
                <Input
                  type="Text"
                  name="validationService"
                  id="validationService"
                  placeholder="Validation Service IP"
                  value={this.state.validationService}
                  onChange={e =>
                    this.setState({ validationService: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
            <Button
              className="bg-gradient-theme-left border-0"
              style={{ width: '100%' }}
              size="lg"
            >
              Save Configurations
            </Button>
          </Form>
          <SweetAlert
            error={this.state.error}
            success={this.state.success}
            show={this.state.showAlert}
            title=""
            html
            text=""
            onConfirm={() => this.setState({ showAlert: false })}
          >
            {this.state.alertText}
          </SweetAlert>
        </Container>
      </div>
    );
  }
}
