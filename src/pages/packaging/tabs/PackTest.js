import React from 'react';
import {
  Input,
  Button,
  InputGroup,
  InputGroupText,
  Row,
  Col,
} from 'reactstrap';

const PackTest = () => {
  return (
    <div>
      <InputGroup>
        <InputGroupText style={{ width: 160, height: 38 }}>
          Container Name
        </InputGroupText>
        <Input className="mb-1" type="text" bsSize="" />
      </InputGroup>
      <InputGroup>
        <InputGroupText style={{ width: 160, height: 38 }}>
          Repository
        </InputGroupText>
        <Input className="mb-1" type="text" bsSize="" />
      </InputGroup>
      <Row>
        <Col>
          <Button>TEST</Button>
        </Col>
      </Row>
    </div>
  );
};

export default PackTest;
