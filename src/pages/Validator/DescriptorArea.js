import React from 'react';
import { FormGroup, Input, Col } from 'reactstrap';

const DescriptorArea = props => {
  const handleTextAreaChange = e => {
    props.handleTextAreaChange({ descriptor: e.target.value });
  };
  return (
    <FormGroup row>
      <Col>
        <Input
          value={props.descriptor}
          type="textarea"
          style={{ height: '60vh' }}
          onChange={handleTextAreaChange}
        />
      </Col>
    </FormGroup>
  );
};

export default DescriptorArea;
