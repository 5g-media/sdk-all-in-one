import React from 'react';
import { Button, FormGroup, Label, Col, Input } from 'reactstrap';

export default class UploadDescriptor extends React.Component {
  onChangeUploadFile = event => {
    event.stopPropagation();
    event.preventDefault();

    const uploadFile = event.target.files[0];
    if (uploadFile) {
      const uploadFileName = uploadFile.name;
      if (
        uploadFile.type === 'application/x-zip-compressed' ||
        uploadFile.type === 'application/x-gzip' ||
        uploadFile.type === 'application/gzip' ||
        uploadFile.type === 'application/zip'
      ) {
        this.props.onUpload({
          uploadFile,
          uploadFileName,
          isArchive: true,
          input: this.uploadArchive,
        });
        // eslint-disable-next-line no-param-reassign
        event.target.value = '';
      } else if (uploadFile.type === '' || uploadFile.type === 'application/x-yaml') {
        this.props.onUpload({
          uploadFile,
          uploadFileName,
          isArchive: false,
          input: this.uploadArchive,
        });
        // eslint-disable-next-line no-param-reassign
        event.target.value = '';
      } else {
        this.props.onBrokenUpload({
          alertText: 'You must upload CSAR format Or yaml file',
          input: this.uploadArchive,
        });
        // eslint-disable-next-line no-param-reassign
        event.target.value = '';
      }
    } else {
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    }
  };

  render() {
    return (
      <FormGroup row>
        <Label for="uploadFile" sm={2}>
          Upload Descriptor
        </Label>
        <Col sm={7}>
          <Input
            readOnly
            value={this.props.uploadFileName}
            placeholder="NSD/VNFD Archive or YAML File"
          />
        </Col>
        <Col>
          <Button
            style={{ width: '100%' }}
            color="secondary"
            onClick={() => {
              if (
                this.props.schemaName !== '' &&
                this.props.descriptorType !== '' &&
                this.props.descriptorType !== null
              ) {
                this.uploadArchive.click();
              } else {
                this.props.handleEmptySchemaName();
              }
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
            onChange={this.onChangeUploadFile}
          />
        </Col>
      </FormGroup>
    );
  }
}
