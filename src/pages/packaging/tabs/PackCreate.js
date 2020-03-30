import React from 'react';
import { connect } from 'react-redux';
import { Input, FormGroup, Label, Col } from 'reactstrap';

import CreateUnikernel from 'pages/packaging/projects/CreateUnikernel';
import CreateDocker from 'pages/packaging/projects/CreateDocker';
import CreateOther from 'pages/packaging/projects/CreateOther';

import * as packagingActions from 'actions/packagingActions';

class PackCreate extends React.Component {
  onProjectTypeChange = e => {
    this.props.setOperationIndex({ operationIndex: e.target.selectedIndex });
  };

  onRepoNameChange = e => {
    this.props.setRepoName({ repoName: e.target.value });
  };

  renderSelectedProject = () => {
    switch (this.props.packaging.operationIndex) {
      case 1:
        return <CreateDocker />;
      case 2:
        return <CreateUnikernel />;
      case 3:
        return <CreateOther />;
      default:
        return null;
    }
  };

  render() {
    return (
      <div>
        <FormGroup row>
          <Label for="repoName" sm={2}>
            Repository Name
          </Label>
          <Col>
            <Input
              className="mb-1"
              type="text"
              value={this.props.packaging.repoName}
              onChange={this.onRepoNameChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="operation" sm={2}>
            Operation
          </Label>
          <Col>
            <Input className="mb-1" type="select" bsSize="" onChange={this.onProjectTypeChange}>
              <option value="" disabled selected>
                Select your operation
              </option>
              <option>Docker</option>
              <option>Unikernel</option>
              <option>Other</option>
            </Input>
          </Col>
        </FormGroup>
        {this.renderSelectedProject()}
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
    setRepoName: ({ repoName }) => dispatch(packagingActions.setRepoName({ repoName })),
    setOperationIndex: ({ operationIndex }) =>
      dispatch(packagingActions.setOperationIndex({ operationIndex })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PackCreate);
