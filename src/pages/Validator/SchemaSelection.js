import React from 'react';
import { FormGroup, Input, Label, Col } from 'reactstrap';

import osmSchema from 'constants/schemas/osm_schema';
import toscaSchema from 'constants/schemas/TOSCA';

class SchemaSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      osmSelected: false,
      toscaSelected: false,
      otherSelected: true,
    };
  }

  componentDidMount() {
    this.setSchema();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.schemaName !== this.props.schemaName) {
      this.setSchema();
    }
  }

  setSchema = () => {
    if (this.props.schemaName === 'tosca') {
      this.setState({
        osmSelected: false,
        toscaSelected: true,
        otherSelected: false,
      });
      this.props.onSchemaChange({
        schema: toscaSchema,
        schemaName: 'tosca',
      });
    } else if (this.props.schemaName === 'osm') {
      this.setState({
        osmSelected: true,
        toscaSelected: false,
        otherSelected: false,
      });
      this.props.onSchemaChange({
        schema: osmSchema,
        schemaName: 'osm',
      });
    } else {
      this.setState({
        osmSelected: false,
        toscaSelected: false,
        otherSelected: true,
      });
    }
  };

  onSchemaChange = e => {
    if (e.target.value === 'TOSCA Schema') {
      this.props.onSchemaChange({
        schema: toscaSchema,
        schemaName: 'tosca',
      });
    } else if (e.target.value === 'OSM Schema') {
      this.props.onSchemaChange({
        schema: osmSchema,
        schemaName: 'osm',
      });
    }
  };

  render() {
    return (
      <FormGroup row>
        <Label for="selectSchema" sm={2}>
          Select Schema
        </Label>
        <Col>
          <Input
            className="mb-1"
            type="select"
            bsSize=""
            onChange={this.onSchemaChange}
          >
            <option disabled selected={this.state.otherSelected}>
              Select Schema
            </option>
            <option selected={this.state.osmSelected}>OSM Schema</option>
            <option selected={this.state.toscaSelected}>TOSCA Schema</option>
          </Input>
        </Col>
      </FormGroup>
    );
  }
}

export default SchemaSelector;
