import React from 'react';
import { FormGroup, Label, Col, Input, Button } from 'reactstrap';

const LoadConfig = props => {
  const getConfs = async () => {
    props.config();
  };

  return (
    <FormGroup row>
      <Label for="serviceName" sm={2}>
        Service Name
      </Label>
      <Col>
        <Input
          type="text"
          name="serviceName"
          id="serviceName"
          placeholder="Service Name"
          value={props.serviceName}
          onChange={e => props.serviceNameChange({ serviceName: e.target.value })}
        />
      </Col>
      <Col>
        <Button style={{ width: '100%' }} disabled={props.confLoading} onClick={getConfs}>
          Load Service Configurations
        </Button>
      </Col>
    </FormGroup>
  );
};

export default LoadConfig;
