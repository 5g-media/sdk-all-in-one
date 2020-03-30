import React from 'react';
import { FormGroup, Input, Label, Col } from 'reactstrap';

class DescriptorTypeSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vnfdSelected: false,
      nsdSelected: false,
      otherSelected: true,
    };
  }

  componentDidMount() {
    if (this.props.descriptorType === 'nsd') {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        vnfdSelected: false,
        nsdSelected: true,
        otherSelected: false,
      });
      this.props.onDescriptorTypeSelected({
        descriptorType: 'nsd',
      });
    } else if (this.props.descriptorType === 'vnfd') {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        vnfdSelected: true,
        nsdSelected: false,
        otherSelected: false,
      });
      this.props.onDescriptorTypeSelected({
        descriptorType: 'vnfd',
      });
    } else {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        vnfdSelected: false,
        nsdSelected: false,
        otherSelected: true,
      });
      this.props.onDescriptorTypeSelected({
        descriptorType: '',
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.descriptorType !== this.props.descriptorType) {
      if (this.props.descriptorType === 'nsd') {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          vnfdSelected: false,
          nsdSelected: true,
          otherSelected: false,
        });
        this.props.onDescriptorTypeSelected({
          descriptorType: 'nsd',
        });
      } else if (this.props.descriptorType === 'vnfd') {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          vnfdSelected: true,
          nsdSelected: false,
          otherSelected: false,
        });
        this.props.onDescriptorTypeSelected({
          descriptorType: 'vnfd',
        });
      } else {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          vnfdSelected: false,
          nsdSelected: false,
          otherSelected: true,
        });
        this.props.onDescriptorTypeSelected({
          descriptorType: '',
        });
      }
    }
  }

  onDescriptorTypeSelected = e => {
    if (e.target.value === 'VNFD') {
      this.props.onDescriptorTypeSelected({
        descriptorType: 'vnfd',
      });
    } else if (e.target.value === 'NSD') {
      this.props.onDescriptorTypeSelected({
        descriptorType: 'nsd',
      });
    }
  };

  render() {
    return (
      <FormGroup row>
        <Label for="selectDescriptorType" sm={2}>
          Select Descriptor Type
        </Label>
        <Col>
          <Input
            className="mb-1"
            type="select"
            bsSize=""
            onChange={this.onDescriptorTypeSelected}
          >
            <option disabled selected={this.state.otherSelected}>
              Select Descriptor Type
            </option>
            <option selected={this.state.vnfdSelected}>VNFD</option>
            <option selected={this.state.nsdSelected}>NSD</option>
          </Input>
        </Col>
      </FormGroup>
    );
  }
}

export default DescriptorTypeSelection;
