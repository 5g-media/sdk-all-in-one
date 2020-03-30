import React from 'react';
import { connect } from 'react-redux';

import { Input, Button, FormGroup, Label, Col, Alert } from 'reactstrap';
import YAML from 'json2yaml';
import SweetAlert from 'react-bootstrap-sweetalert/lib/dist/SweetAlert';

import { packageConf, runConf } from 'constants/unikernelTemplate/nodejs/nodePackageUtils';
import { getConfig } from 'utils/configUtils';
import { projectTypes } from 'constants/packaging';

import * as packagingActions from 'actions/packagingActions';

class CreateUnikernel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
    };
  }

  async componentDidMount() {
    const configRes = await getConfig();
    const { config } = configRes;

    const configg = localStorage.getItem('isAdmin') === 'true' ? config.admin : config.developer;
    this.setState({ config: configg });
  }

  onProjectChange = e => {
    if (e.target.selectedIndex === 1) {
      this.props.setPackageYaml({ packageYaml: YAML.stringify(packageConf) });
      this.props.setRunYaml({ runYaml: YAML.stringify(runConf) });
    }
  };

  onButtonClick = () => {
    this.props.setLoading({ loading: true });
    this.createProject();
  };

  createProject = async () => {
    const { config } = this.state;
    const { repoName, runYaml, packageYaml } = this.props.packaging;
    const token = config.gitlab.gitlabToken;
    this.props.createProject({ repoName, runYaml, packageYaml, token });
  };

  render() {
    return (
      <div style={{ marginTop: '2vh' }}>
        <FormGroup row>
          <Label for="projectType" sm={2}>
            Choose Project Type
          </Label>
          <Col>
            <Input className="mb-1" type="select" onChange={this.onProjectChange}>
              <option value="" disabled selected>
                Select your option
              </option>
              {projectTypes.map(p => (
                <option key={p}>{p}</option>
              ))}
            </Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col>
            <Label>Packaging Configuration</Label>
            <Input
              type="textarea"
              style={{ height: '60vh' }}
              value={this.props.packaging.packageYaml}
              onChange={e => this.props.setPackageYaml({ packageYaml: e.target.value })}
            />
          </Col>
          <Col>
            <Label>Runtime Configuration</Label>
            <Input
              type="textarea"
              style={{ height: '60vh' }}
              value={this.props.packaging.runYaml}
              onChange={e => this.props.setRunYaml({ runYaml: e.target.value })}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col>
            <Button disabled={this.props.packaging.loading} onClick={this.onButtonClick}>
              CREATE PROJECT
            </Button>
            <Alert
              color="dark"
              style={{
                padding: '0.5vh',
                display: this.props.packaging.projectGitUrl ? '' : 'none',
              }}
            >
              {this.props.packaging.projectGitUrl}
            </Alert>
          </Col>
        </FormGroup>
        <SweetAlert
          show={this.props.packaging.showAlert}
          title=""
          html
          text=""
          success={this.props.packaging.success}
          error={this.props.packaging.error}
          onConfirm={() => this.props.closeAlert()}
        >
          {this.props.packaging.alertText}
        </SweetAlert>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    packaging: state.packaging,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPackageYaml: ({ packageYaml }) => dispatch(packagingActions.setPackageYaml({ packageYaml })),
    setRunYaml: ({ runYaml }) => dispatch(packagingActions.setRunYaml({ runYaml })),
    setLoading: ({ loading }) => dispatch(packagingActions.setLoading({ loading })),
    createProject: ({ repoName, runYaml, packageYaml, token }) =>
      dispatch(packagingActions.createProject({ repoName, runYaml, packageYaml, token })),
    closeAlert: () => dispatch(packagingActions.closeAlert()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateUnikernel);
