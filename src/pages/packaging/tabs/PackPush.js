import React from 'react';
import {
  Input,
  Button,
  InputGroup,
  InputGroupText,
  Row,
  Col,
} from 'reactstrap';

const PackPush = () => {
  return (
    <div>
      <InputGroup>
        <InputGroupText style={{ width: 210, height: 38 }}>
          Container Name
        </InputGroupText>
        <Input className='mb-1' type='text' bsSize='' />
      </InputGroup>
      <InputGroup>
        <InputGroupText style={{ width: 210, height: 38 }}>
          Remote Repository URL
        </InputGroupText>
        <Input className='mb-1' type='text' bsSize='' />
      </InputGroup>
      <Row>
        <Col>
          <Button>PUSH</Button>
        </Col>
      </Row>
    </div>
  );
};

export default PackPush;
