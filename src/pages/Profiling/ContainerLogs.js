import React from 'react';
import { Input, FormGroup, Label } from 'reactstrap';

const ContainerLogs = props => (
  <FormGroup row>
    <Label>Container Logs</Label>
    <Input
      type="textarea"
      disabled
      value={props.logs}
      style={{ height: '35vh', overflow: 'scroll', resize: 'none' }}
    />
  </FormGroup>
);

export default ContainerLogs;
