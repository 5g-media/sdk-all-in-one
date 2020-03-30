import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, FormGroup, Button, Col } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert/lib/dist/SweetAlert';

import Page from 'components/Page';
import DescriptorUpload from 'pages/Validator/DescriptorUpload';
import PackageExport from 'pages/Validator/PackageExport';
import SchemaSelector from 'pages/Validator/SchemaSelection';
import DescriptorArea from 'pages/Validator/DescriptorArea';
import ValidationResult from 'pages/Validator/ValidationResult';

import * as validatorActions from 'actions/validatorActions';

import { getConfig } from 'utils/configUtils';
import { validate, checkIsVnfd, yaml2jsonparse } from 'utils/validateUtils';
import DescriptorTypeSelection from './DescriptorTypeSelection';

class Validator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alertText: '',
      config: {},
      onBoardDisabled: false,
      input: { value: null },
    };
  }

  async componentDidMount() {
    const configRes = await getConfig();
    const { config } = configRes;

    const configg =
      localStorage.getItem('isAdmin') === 'true'
        ? config.admin
        : config.developer;
    this.setState({ config: configg });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.validator.showAlert !== this.props.validator.showAlert) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        showAlert: this.props.validator.showAlert,
        alertText: this.props.validator.alertText,
        error: this.props.validator.error,
        success: this.props.validator.success,
        onBoardDisabled: this.props.validator.onBoardDisabled,
      });
    }
  }

  onUpload = ({ uploadFile, uploadFileName, isArchive, input }) => {
    const { config } = this.state;
    const { schemaName, descriptorType } = this.props.validator;
    this.setState({ input });

    this.props.onUpload({
      uploadFile,
      uploadFileName,
      isArchive,
      schemaName,
      descriptorType,
      validationServiceIp: config.validation.extract_service,
    });
  };

  exportdescriptor = () => {
    const {
      descriptor,
      descriptorName,
      isArchive,
      isVnfd,
      schemaName,
    } = this.props.validator;
    const validationServiceIp = this.state.config.validation.extract_service;

    this.props.exportDescriptor({
      descriptor,
      descriptorName,
      isArchive,
      isVnfd,
      schemaName,
      validationServiceIp,
    });
  };

  onboardToPrivateCatalogue = () => {
    if (this.props.validator.isVnfd) {
      this.onboardVnfd();
    } else {
      this.onboardNsd();
    }
  };

  onboardNsd = async () => {
    this.setState({ onBoardDisabled: true });
    const { catalogue } = this.state.config;

    const privateCatalogueIP = catalogue.catalogue_IP;
    const privateCataloguePort = catalogue.catalogue_port;

    const { descriptor, descriptorName, status } = this.props.validator;

    this.props.nsdOnboard({
      privateCatalogueIP,
      privateCataloguePort,
      descriptor,
      descriptorName,
      status,
    });
  };

  onboardVnfd = async () => {
    this.setState({ onBoardDisabled: true });
    const { catalogue, validation } = this.state.config;

    const privateCatalogueIP = catalogue.catalogue_IP;
    const privateCataloguePort = catalogue.catalogue_port;
    const validationServiceIp = validation.extract_service;

    const { descriptorName, status } = this.props.validator;

    this.props.vnfdOnboard({
      privateCatalogueIP,
      privateCataloguePort,
      validationServiceIp,
      descriptorName,
      status,
    });
  };

  validate = () => {
    const { descriptor, schema, schemaName } = this.props.validator;
    const status = validate({
      descriptor,
      schema,
      schemaName,
    });
    const parsedDescriptor = yaml2jsonparse(descriptor, schemaName);
    const isVnfd = checkIsVnfd({ descriptor: parsedDescriptor, schemaName });
    this.props.setisVnfd({ isVnfd });
    this.props.setStatus({ status });
    this.setState({
      alertText: status.validStatus,
      showAlert: true,
      error: !status.isValid,
      success: status.isValid,
    });

    if (status.isValid === true) {
      this.exportdescriptor();
    }
  };

  handleUploadTypeError = ({ alertText, input }) => {
    this.setState({
      alertText,
      showAlert: true,
      error: true,
      success: false,
      input,
    });
  };

  onExport = (alertText, showAlert, error, success) => {
    this.setState({ alertText, showAlert, error, success });
  };

  onSchemaChange = ({ schema, schemaName }) => {
    this.props.setSchema({ schema, schemaName });
  };

  handleTextAreaChange = ({ descriptor }) => {
    this.props.handleDescriptorChange({ descriptor });
  };

  handleEmptySchemaName = () => {
    this.setState({
      alertText: 'Please Select Correct Schema And Descriptor Type First!!',
      showAlert: true,
      error: true,
      success: false,
    });
  };

  onDescriptorTypeSelected = ({ descriptorType }) => {
    this.props.setDescriptorType({ descriptorType });
  };

  handleReset = () => {
    this.props.reset();
    const { input } = this.state;
    input.value = null;
  };

  render() {
    const { validator } = this.props;
    return (
      <Container>
        <Page
          title="Validator"
          breadcrumbs={[{ name: 'Validator', active: true }]}
        >
          <SchemaSelector
            onSchemaChange={this.onSchemaChange}
            schemaName={validator.schemaName}
          />
          <DescriptorTypeSelection
            onDescriptorTypeSelected={this.onDescriptorTypeSelected}
            descriptorType={validator.descriptorType}
          />
          <DescriptorUpload
            uploadFileName={validator.uploadFileName}
            onUpload={this.onUpload}
            onBrokenUpload={this.handleUploadTypeError}
            schemaName={validator.schemaName}
            descriptorType={validator.descriptorType}
            handleEmptySchemaName={this.handleEmptySchemaName}
          />
          <DescriptorArea
            descriptor={validator.descriptor}
            handleTextAreaChange={this.handleTextAreaChange}
          />
          <FormGroup row>
            <Col>
              <Button
                color="secondary"
                onClick={this.validate}
                style={{ width: '100%' }}
              >
                Validate
              </Button>
            </Col>
            <Col>
              <Button
                color="secondary"
                onClick={this.onboardToPrivateCatalogue}
                style={{ width: '100%' }}
                disabled={this.state.onBoardDisabled}
              >
                Onboard to Private Catalogue
              </Button>
            </Col>
            <Col>
              <PackageExport
                onExport={this.onExport}
                exportUrl={validator.exportURL}
              />
            </Col>
            <Col>
              <Button style={{ width: '100%' }} onClick={this.handleReset}>
                Reset
              </Button>
            </Col>
          </FormGroup>
          <ValidationResult
            isValid={validator.status.isValid}
            validStatus={validator.status.validStatus}
            errorDataPath={validator.status.errorDataPath}
            errorMessage={validator.status.errorMessage}
          />
          <SweetAlert
            error={this.state.error}
            success={this.state.success}
            show={this.state.showAlert}
            title=""
            html
            text=""
            onConfirm={() => {
              this.props.closeAlert({ showAlert: false });
              this.setState({ showAlert: false });
            }}
          >
            {this.state.alertText}
          </SweetAlert>
        </Page>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    validator: state.validator,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpload: ({
      uploadFile,
      uploadFileName,
      isArchive,
      schemaName,
      descriptorType,
      validationServiceIp,
    }) =>
      dispatch(
        validatorActions.onUpload({
          uploadFile,
          uploadFileName,
          isArchive,
          schemaName,
          descriptorType,
          validationServiceIp,
        }),
      ),
    exportDescriptor: ({
      descriptor,
      descriptorName,
      isArchive,
      isVnfd,
      schemaName,
      validationServiceIp,
    }) =>
      dispatch(
        validatorActions.exportDescriptor({
          descriptor,
          descriptorName,
          isArchive,
          isVnfd,
          schemaName,
          validationServiceIp,
        }),
      ),
    closeAlert: ({ showAlert }) =>
      dispatch(validatorActions.closeAlert({ showAlert })),
    setSchema: ({ schema, schemaName }) =>
      dispatch(validatorActions.setSchema({ schema, schemaName })),
    handleDescriptorChange: ({ descriptor }) =>
      dispatch(validatorActions.handleDescChange({ descriptor })),
    setStatus: ({ status }) => dispatch(validatorActions.setStatus({ status })),
    vnfdOnboard: ({
      privateCatalogueIP,
      privateCataloguePort,
      validationServiceIp,
      descriptorName,
      status,
    }) =>
      dispatch(
        validatorActions.vnfdOnboard({
          privateCatalogueIP,
          privateCataloguePort,
          validationServiceIp,
          descriptorName,
          status,
        }),
      ),
    nsdOnboard: ({
      privateCatalogueIP,
      privateCataloguePort,
      descriptor,
      descriptorName,
      status,
    }) =>
      dispatch(
        validatorActions.nsdOnboard({
          privateCatalogueIP,
          privateCataloguePort,
          descriptor,
          descriptorName,
          status,
        }),
      ),
    reset: () => dispatch(validatorActions.reset()),
    setDescriptorType: ({ descriptorType }) =>
      dispatch(validatorActions.setDescriptorType({ descriptorType })),
    setisVnfd: ({ isVnfd }) => dispatch(validatorActions.setisVnfd({ isVnfd })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Validator);
