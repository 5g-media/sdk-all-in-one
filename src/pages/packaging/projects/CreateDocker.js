import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Col, Alert } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert/lib/dist/SweetAlert';

import * as packagingActions from 'actions/packagingActions';
import { getConfig } from '../../../utils/configUtils';

const CreateDocker = props => {
  const getToken = async () => {
    const configRes = await getConfig();
    const { config } = configRes;

    const configg = localStorage.getItem('isAdmin') === 'true' ? config.admin : config.developer;
    return configg.gitlab.gitlabToken;
  };
  const onButtonClick = async () => {
    props.setLoading({ loading: true });
    props.createDockerProject({ repoName: props.packaging.repoName, token: await getToken() });
  };
  return (
    <div style={{ marginTop: '2vh' }}>
      <FormGroup row>
        <Col>
          <Button disabled={props.packaging.loading} onClick={onButtonClick}>
            CREATE PROJECT
          </Button>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col>
          <Alert
            color="dark"
            style={{
              padding: '0.5vh',
              display: props.packaging.projectGitUrl ? '' : 'none',
            }}
          >
            {props.packaging.projectGitUrl}
          </Alert>
        </Col>
      </FormGroup>
      <SweetAlert
        show={props.packaging.showAlert}
        title=""
        html
        text=""
        success={props.packaging.success}
        error={props.packaging.error}
        onConfirm={() => props.closeAlert()}
      >
        {props.packaging.alertText}
      </SweetAlert>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    packaging: state.packaging,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: ({ loading }) => dispatch(packagingActions.setLoading({ loading })),
    closeAlert: () => dispatch(packagingActions.closeAlert()),
    createDockerProject: ({ repoName, token }) =>
      dispatch(packagingActions.createRepoForDocker({ repoName, token })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateDocker);
