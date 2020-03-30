import React from 'react';
import { FormGroup, Label, Col, Input } from 'reactstrap';

const ProfileType = props => {
  const onProfileTypeChange = e => {
    props.profileTypeChange({ [e.target.name]: e.target.value });
  };
  return (
    <FormGroup row>
      <Label for="dataType" sm={2}>
        Profile Type
      </Label>
      <Col>
        <Input className="mb-1" type="select" name="platform" onChange={onProfileTypeChange}>
          <option>Faas</option>
          <option>Non-Faas</option>
        </Input>
      </Col>
      <Col>
        <Input className="mb-1" type="select" name="mode" onChange={onProfileTypeChange}>
          <option>Producer</option>
          <option>Consumer</option>
        </Input>
      </Col>
    </FormGroup>
  );
};
export default ProfileType;
