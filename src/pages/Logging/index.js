import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';

import Page from 'components/Page';
import { getConfig } from 'utils/configUtils';

import * as loggingActions from 'actions/loggingActions';

import { tableHeadsFirst } from 'constants/logging';

import { MdFindReplace, MdDeleteForever } from 'react-icons/lib/md';

class Logging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      configg: {},
      visible: false,
      alert: false,
      datum: [],
      modelDesc: [],
      modelTitle: '',
    };
  }

  async componentDidMount() {
    const configRes = await getConfig();
    const { config } = configRes;

    const configg =
      localStorage.getItem('isAdmin') === 'true'
        ? config.admin
        : config.developer;
    this.setState({ configg });

    this.getIssues();
  }

  getIssues = () => {
    this.props.getIssues({ config: this.state.configg });
  };

  openDescription = datum => {
    this.setState({
      modelDesc: datum.description,
      modelTitle: datum.vnfdName,
      visible: true,
    });
  };

  openAlert = datum => {
    this.setState({
      modelTitle: datum.id,
      datum,
      alert: true,
    });
  };

  deleteIssue = datum => {
    this.props.deleteIssue({
      config: this.state.configg,
      issueId: datum.id,
    });
  };

  updateDescriptor = datum => {
    this.props.fetchDescriptors({
      privateCatalogueIP: this.state.configg.catalogue.catalogue_IP,
    });
    this.getDescriptor({ datum });
    this.props.updateDescriptor();
    this.props.history.push('validator');
  };

  getDescriptor = ({ datum }) => {
    this.props.getDescriptor({
      privateCatalogueIP: this.state.configg.catalogue.catalogue_IP,
      datum,
    });
  };

  fetchDescriptors = ({ privateCatalogueIP }) => {
    this.props.fetchDescriptors({ privateCatalogueIP });
  };

  render() {
    const { issues } = this.props;

    return (
      <Page
        title="SVP Runtime Advisor"
        breadcrumbs={[{ name: 'Advisor', active: true }]}
      >
        <div>
          <Table>
            <thead>
              <tr>
                {tableHeadsFirst.map(head => (
                  <th {...head}>{head.text}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {issues.map(datum => (
                <tr>
                  <td>{datum.id}</td>
                  <td>{datum.date}</td>
                  <td>{datum.vnfdId}</td>
                  <td>{datum.issueType}</td>
                  <td>
                    {datum.cpuCurrent} <br />
                    {datum.memoryCurrent} <br />
                    {datum.storageCurrent}
                  </td>
                  <td>
                    {datum.cpuRecommended} <br />
                    {datum.memoryRecommended} <br />
                    {datum.storageRecommended}
                  </td>
                  <td>
                    <Button onClick={() => this.openDescription(datum)}>
                      <MdFindReplace />
                    </Button>{' '}
                    <Button onClick={() => this.updateDescriptor(datum)}>
                      Update
                    </Button>{' '}
                    <Button
                      disabled={this.props.loading}
                      onClick={() => this.openAlert(datum)}
                    >
                      <MdDeleteForever />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Modal
          size="lg"
          isOpen={this.state.visible}
          toggle={() => this.setState({ visible: false })}
        >
          <ModalHeader toggle={() => this.setState({ visible: false })}>
            {this.state.modelTitle}
          </ModalHeader>
          <ModalBody>
            {this.state.modelDesc.map(datum => (
              <tr>
                <td>{datum}</td>
              </tr>
            ))}
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.alert}
          toggle={() => this.setState({ alert: false })}
        >
          <ModalHeader toggle={() => this.setState({ alert: false })}>
            Issue ID: {this.state.modelTitle}
          </ModalHeader>
          <ModalBody>Do you want to delete the issue?</ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                this.setState({ alert: false });
                this.deleteIssue(this.state.datum);
              }}
            >
              Delete
            </Button>{' '}
            <Button
              color="secondary"
              onClick={() => this.setState({ alert: false })}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    logging: state.logging,
    issues: state.logging.issues,
    loading: state.logging.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getIssues: ({ config }) => dispatch(loggingActions.getIssues({ config })),
    deleteIssue: ({ config, issueId }) =>
      dispatch(loggingActions.deleteIssue({ config, issueId })),
    updateDescriptor: () => dispatch(loggingActions.updateDescriptor()),
    getDescriptor: ({ datum, privateCatalogueIP }) =>
      dispatch(
        loggingActions.getDescriptor({
          datum,
          privateCatalogueIP,
        }),
      ),
    fetchDescriptors: ({ privateCatalogueIP }) =>
      dispatch(loggingActions.fetchDescriptors({ privateCatalogueIP })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logging);
