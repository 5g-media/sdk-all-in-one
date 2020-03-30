import React from 'react';
import { FormGroup, Alert } from 'reactstrap';

const ValidationResult = props => (
  <FormGroup>
    <Alert color={props.isValid ? 'success' : 'danger' || 'light'}>
      <span>{props.validStatus}</span>
      <br />
      <span>{props.errorDataPath}</span>
      <br />
      <span>{props.errorMessage}</span>
    </Alert>
  </FormGroup>
);

export default ValidationResult;
