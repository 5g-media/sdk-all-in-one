import React from 'react';
import { connect } from 'react-redux';

import { Input, Button, FormGroup, Label, Col } from 'reactstrap';

import * as packagingActions from 'actions/packagingActions';
import { getConfig } from 'utils/configUtils';
import { projectTypes } from '../../../constants/packaging';

class PackCreate extends React.Component {
  async componentDidMount() {
    const configRes = await getConfig();
    const { config } = configRes;
    const configg =
      localStorage.getItem('isAdmin') === 'true'
        ? config.admin
        : config.developer;

    this.props.getRepos({ token: configg.gitlab.gitlabToken });
  }

  onRepoChange = e => {
    const { repositories } = this.props.packaging;
    const activeRepo = repositories.find(
      repo => repo.id.toString() === e.target.value,
    );

    this.props.setActiveRepo({ activeRepo });
  };

  onProjectTypeChange = e => {
    this.props.setSelectedProjectType({
      selectedIndex: e.target.selectedIndex,
    });
  };

  onUserListChange = e => {
    const userList = e.target.value;
    this.props.setUserList({ userList });
  };

  handleBuildStatusCheck = async () => {
    const { activeRepo, selectedProjectType } = this.props.packaging;

    this.props.setBuildStatusLoading({ buildStatusLoading: true });
    this.props.getBuildStatus({ activeRepo, selectedProjectType });
  };

  onBuildClick = () => {
    const { activeRepo, selectedProjectType, userList } = this.props.packaging;

    this.props.setBuildButtonLoading({ buildButtonLoading: true });
    this.props.buildProject({ activeRepo, selectedProjectType, userList });
  };

  render() {
    const {
      repositories,
      activeRepo,
      userList,
      buildStatusLoading,
      buildButtonLoading,
      buildedTaskName,
      buildResult,
      projectName,
      selectedProjectType,
    } = this.props.packaging;
    return (
      <div>
        <FormGroup row>
          <Label for='gitRepo' sm={2}>
            Repository
          </Label>
          <Col>
            <Input className='mb-1' type='select' onChange={this.onRepoChange}>
              <option />
              {repositories.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='sourceUrl' sm={2}>
            Source Code URL
          </Label>
          <Col>
            <Input
              className='mb-1'
              type='text'
              readOnly
              value={
                activeRepo !== undefined ? activeRepo.http_url_to_repo : ''
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='projectType' sm={2}>
            Choose Project Type
          </Label>
          <Col>
            <Input
              className='mb-1'
              type='select'
              onChange={this.onProjectTypeChange}
            >
              <option value='' disabled selected>
                Select your option
              </option>
              {projectTypes.map(p => (
                <option
                  selected={selectedProjectType === p ? true : false}
                  key={p}
                >
                  {p}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='userList' sm={2}>
            User list
          </Label>
          <Col>
            <Input
              className='mb-1'
              type='text'
              value={userList}
              onChange={this.onUserListChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={2}>
            <Button
              style={{ width: '100%' }}
              onClick={this.onBuildClick}
              disabled={buildButtonLoading}
            >
              BUILD PROJECT
            </Button>
          </Col>
          <Col sm={10}>
            <Input readOnly value={buildedTaskName} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={2}>
            <Button
              style={{ width: '100%' }}
              color='secondary'
              onClick={this.handleBuildStatusCheck}
              disabled={buildStatusLoading}
            >
              CHECK STATUS
            </Button>
          </Col>
          <Col sm={10}>
            <Input value={buildResult} placeholder='' disabled />
          </Col>
        </FormGroup>
        {projectName !== '' ? (
          <FormGroup row>
            <Label for='sourceUrl' sm={2}>
              Docker Image Name
            </Label>
            <Col>
              <Input
                className='mb-1'
                type='text'
                readOnly
                value={`docker5gmedia/${projectName}`}
              />
            </Col>
          </FormGroup>
        ) : null}
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
    getRepos: ({ token }) => dispatch(packagingActions.getRepos({ token })),
    setActiveRepo: ({ activeRepo }) =>
      dispatch(packagingActions.setActiveRepo({ activeRepo })),
    setSelectedProjectType: ({ selectedIndex }) =>
      dispatch(packagingActions.setSelectedProjectType({ selectedIndex })),
    setUserList: ({ userList }) =>
      dispatch(packagingActions.setUserList({ userList })),
    setBuildStatusLoading: ({ buildStatusLoading }) =>
      dispatch(packagingActions.setBuildStatusLoading({ buildStatusLoading })),
    getBuildStatus: ({ activeRepo, selectedProjectType }) =>
      dispatch(
        packagingActions.getBuildStatus({ activeRepo, selectedProjectType }),
      ),
    setBuildButtonLoading: ({ buildButtonLoading }) =>
      dispatch(packagingActions.setBuildButtonLoading({ buildButtonLoading })),
    buildProject: ({ activeRepo, selectedProjectType, userList }) =>
      dispatch(
        packagingActions.buildProject({
          activeRepo,
          selectedProjectType,
          userList,
        }),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PackCreate);
