import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Button,
  FormGroup,
  Input,
} from 'reactstrap';
import Page from 'components/Page';

import {
  startTraining,
  stopTraining,
  tensorboardStart,
} from 'api/service/configurationService';
import SweetAlert from 'react-bootstrap-sweetalert/lib/dist/SweetAlert';

import { getConfig } from 'utils/configUtils';
import { uploadService, deployMape } from '../api/service/trainingService';

export default class TrainingPage extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      modelType: '',
      nameNnModel: '',
      alpha: '',
      bgTrafficPattern: '',
      actorLearningRate: '',
      criticLearningRate: '',
      linkCapacity: '',
      seedNumber: '',
      rewardFunction: '',
      parallelAgent: '',
      trainingWarning: '',
      loading: false,
      stopping: true,
      random: 0,
      dropdownOpen: false,
      uploadFileName: '',
      showAlert: false,
      alertText: '',
    };
  }

  async componentDidMount() {
    const configRes = await getConfig();
    const {
      extract_service: extractService,
    } = configRes.config.developer.validation;

    this.setState({
      validationServiceIp: extractService,
    });
  }

  onFormSubmit = async e => {
    e.preventDefault();

    const {
      modelType,
      nameNnModel,
      alpha,
      bgTrafficPattern,
      actorLearningRate,
      criticLearningRate,
      linkCapacity,
      seedNumber,
      rewardFunctionShort,
      uploadFileName,
      parallelAgent,
    } = this.state;
    this.setState({
      loading: true,
      stopping: false,
      showAlert: true,
      alertText: 'Training Started',
    });
    await startTraining({
      confdata: {
        modelType,
        nameNnModel,
        alpha,
        bgTrafficPattern,
        actorLearningRate,
        criticLearningRate,
        rewardFunction: rewardFunctionShort,
        linkCapacity,
        seedNumber,
        uploadFileName,
        parallelAgent,
      },
      validationServiceIp: this.state.validationServiceIp,
    });
  };

  deployMape = async e => {
    e.preventDefault();

    const data2 = await deployMape({
      productionIP: '127.0.0.0',
      validationServiceIp: this.state.validationServiceIp,
    });

    this.setState({ showAlert: true, alertText: data2.data });
  };

  onBackClick = () => {
    this.props.history.push('/');
  };

  handleReset = () => {
    let { random } = this.state;
    random += 1;
    this.setState({ random });
  };

  finishTraining = async e => {
    e.preventDefault();
    this.setState({ loading: false, stopping: true });

    await stopTraining({
      validationServiceIp: this.state.validationServiceIp,
    });
    this.setState({
      showAlert: true,
      success: true,
      error: false,
      alertText: 'Training Stopped',
    });
  };

  startTensorboard = async e => {
    e.preventDefault();

    await tensorboardStart({
      validationServiceIp: this.state.validationServiceIp,
    });
    this.setState({
      showAlert: true,
      alertText:
        'Tensorboard started, please click on Refresh Results to update the results',
    });
  };

  uploadZipFile = async event => {
    event.stopPropagation();
    event.preventDefault();

    const uploadFile = event.target.files[0];
    if (uploadFile) {
      if (uploadFile.type === 'application/x-zip-compressed') {
        await uploadService({
          uploadFile,
          validationServiceIp: this.state.validationServiceIp,
        });
        this.setState({ uploadFileName: uploadFile.name });
      }
    }
  };

  handleSelection = e => {
    if (e.target.selectedIndex === 1) {
      this.setState({
        rewardFunctionShort: 'bls',
        rewardFunction: e.target.value,
      });
    } else if (e.target.selectedIndex === 2) {
      this.setState({
        rewardFunctionShort: 'bl',
        rewardFunction: e.target.value,
      });
    } else if (e.target.selectedIndex === 3) {
      this.setState({
        rewardFunctionShort: 'b',
        rewardFunction: e.target.value,
      });
    }
  };

  toggle() {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen,
    });
  }

  render() {
    return (
      <div>
        <Page className="TrainingPage">
          <Row>
            <Col sm={4}>
              <Card>
                <CardHeader>CNO Training Environment</CardHeader>
                <CardBody>
                  <p>Select Algorithm:</p>
                  <Input className="mb-1" type="select" name="mode">
                    <option>REINFORCED LEARNING ALGORITHM</option>
                  </Input>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <input
                    type="text"
                    name="trainingName"
                    id="trainingName"
                    placeholder="Training Name:"
                    value={this.state.nameNnModel ? this.state.nameNnModel : ''}
                    onChange={e =>
                      this.setState({ nameNnModel: e.target.value })
                    }
                  />
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <FormGroup row>
                    <Col sm={8}>
                      <Input
                        readOnly
                        value={this.state.uploadFileName}
                        placeholder="TRAINING DATA (ZIP)"
                      />
                    </Col>
                    <Col>
                      <Button
                        style={{ width: '100%' }}
                        color="secondary"
                        onClick={() => {
                          this.uploadArchive.click();
                        }}
                      >
                        Upload
                      </Button>
                      <input
                        id="archiveInput"
                        type="file"
                        // eslint-disable-next-line no-return-assign
                        ref={ref => (this.uploadArchive = ref)}
                        style={{ display: 'none' }}
                        onChange={this.uploadZipFile}
                      />
                    </Col>
                  </FormGroup>
                  <p>
                    Reward Function Construction:
                    <Input
                      className="mb-1"
                      type="select"
                      name="mode"
                      value={
                        this.state.rewardFunction
                          ? this.state.rewardFunction
                          : ''
                      }
                      onChange={this.handleSelection}
                    >
                      <option selected />
                      <option>W/ Bit-rate, Loss-rate, Smoothness </option>
                      <option>W/ Bit-rate and Loss-rate only </option>
                      <option>W/ Bit-rate only</option>
                    </Input>
                  </p>
                  <p>
                    Background Traffic Pattern:
                    <Input
                      className="mb-1"
                      type="select"
                      name="mode"
                      value={
                        this.state.bgTrafficPattern
                          ? this.state.bgTrafficPattern
                          : ''
                      }
                      onChange={e =>
                        this.setState({ bgTrafficPattern: e.target.value })
                      }
                    >
                      <option selected />
                      <option>sawtooth </option>
                      <option>random </option>
                    </Input>
                  </p>
                  <p>
                    Weight for the mean loss rate:
                    <p>
                      <input
                        type="text"
                        name="meanLoss"
                        id="meanLoss"
                        placeholder="Weight for the mean loss rate:"
                        value={this.state.alpha ? this.state.alpha : ''}
                        onChange={e => this.setState({ alpha: e.target.value })}
                      />
                    </p>
                  </p>
                  <p>
                    Actor Learning Rate:
                    <p>
                      <input
                        type="text"
                        name="actorLearningRate"
                        id="actorLearningRate"
                        placeholder="Actor Learning Rate:"
                        value={
                          this.state.actorLearningRate
                            ? this.state.actorLearningRate
                            : ''
                        }
                        onChange={e =>
                          this.setState({ actorLearningRate: e.target.value })
                        }
                      />
                    </p>
                  </p>
                  <p>
                    Critic Learning Rate:
                    <p>
                      <input
                        type="text"
                        name="criticLearningRate"
                        id="criticLearningRate"
                        placeholder="Critic Learning Rate:"
                        value={
                          this.state.criticLearningRate
                            ? this.state.criticLearningRate
                            : ''
                        }
                        onChange={e =>
                          this.setState({ criticLearningRate: e.target.value })
                        }
                      />
                    </p>
                  </p>
                  <p>
                    Link Capacity (Mbps):
                    <p>
                      {' '}
                      <input
                        type="text"
                        name="linkCapacity"
                        id="linkCapacity"
                        placeholder="Link Capacity:"
                        value={
                          this.state.linkCapacity ? this.state.linkCapacity : ''
                        }
                        onChange={e =>
                          this.setState({ linkCapacity: e.target.value })
                        }
                      />
                    </p>
                  </p>
                  <p>
                    Number of Parallel Agent:
                    <p>
                      {' '}
                      <input
                        type="text"
                        name="parallelAgent"
                        id="parallelAgent"
                        placeholder="Parallel Agent:"
                        value={
                          this.state.parallelAgent
                            ? this.state.parallelAgent
                            : ''
                        }
                        onChange={e =>
                          this.setState({ parallelAgent: e.target.value })
                        }
                      />
                    </p>
                  </p>
                  <p>
                    Number of Seed:
                    <p>
                      {' '}
                      <input
                        type="text"
                        name="seedNumber"
                        id="seedNumber"
                        placeholder="Seed Number:"
                        value={
                          this.state.seedNumber ? this.state.seedNumber : ''
                        }
                        onChange={e =>
                          this.setState({ seedNumber: e.target.value })
                        }
                      />
                    </p>
                  </p>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Button
                    style={{ width: '50%' }}
                    onClick={this.onFormSubmit}
                    disabled={this.state.loading}
                  >
                    {' '}
                    Start Training{' '}
                  </Button>
                  <Button
                    style={{ width: '50%' }}
                    onClick={this.finishTraining}
                    disabled={this.state.stopping}
                  >
                    {' '}
                    Stop Training{' '}
                  </Button>
                </CardBody>
              </Card>
            </Col>

            <Col sm={8}>
              <Card inverse className="bg-gradient-primary">
                <CardHeader className="bg-gradient-primary">Results</CardHeader>
                <CardBody>
                  <p>{this.state.trainingWarning}</p>
                  <iframe
                    key={this.state.random}
                    title="monitoring"
                    src={`http://${this.state.validationServiceIp}:6006/#scalars`}
                    style={{ height: '820px', width: '100%' }}
                  />
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Button
                    color="secondary"
                    style={{ width: '50%' }}
                    onClick={this.startTensorboard}
                  >
                    Start Tensorboard
                  </Button>
                  <Button
                    color="secondary"
                    style={{ width: '50%' }}
                    onClick={this.handleReset}
                  >
                    Refresh Results
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Button
                    color="secondary"
                    style={{ width: '100%' }}
                    onClick={this.deployMape}
                  >
                    Deploy to MAPE
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <SweetAlert
            error={this.state.error}
            success={this.state.success}
            show={this.state.showAlert}
            title=""
            html
            text=""
            onConfirm={() => {
              this.setState({ showAlert: false });
            }}
          >
            {this.state.alertText}
          </SweetAlert>
        </Page>
      </div>
    );
  }
}
