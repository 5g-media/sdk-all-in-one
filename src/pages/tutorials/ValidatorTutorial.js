import React from 'react';
import { Container } from 'reactstrap';

import validate from 'assets/tutorial/Validatorvalid1.png';

export default function ValidatorTutorial() {
  return (
    <Container>
      <div>
        <img src={validate} alt="Validation" style={{ width: '100%' }} />
        <p>
          <br />
        </p>
        <br />
        <p>
          <b>Validator Web UI:</b>
        </p>
        <p>
          The Validator Web UI provides the developer necessary tools to develop
          their VNF and NS descriptors, validate them against given TOSCA or OSM
          schemas, onboard them to private catalogue and export the developed
          applications on CSAR format.
        </p>
        <p>
          The Validator Web UI screenshot is given above. The developer can do
          following actions to develop their applications or service
          <p>
            The developer can import a descriptor by clicking the button
            referred with <b>(1)</b>{' '}
          </p>
          <p>
            The developer can select their schema with a dropdown menu referred
            with <b>(2)</b>{' '}
          </p>
          <p>
            The developer can write/edit their descriptor in the text field
            referred with <b>(a)</b>{' '}
          </p>
          <p>
            The developer can validate their descriptor by clicking the button
            referred with <b>(3)</b>{' '}
          </p>
          <p>
            The developer can onboard their descriptor to private catalogue by
            clicking the button referred with <b>(4)</b>{' '}
          </p>
          <p>
            The developer can export their descriptor to their local environment
            as a CSAR package by clicking the button referred with <b>(5)</b>{' '}
          </p>
        </p>
        <p>
          <b>Output codes :</b>
        </p>
        <b>Code: 200</b> <p>=> JSON Schema File is Valid.</p>
        <b>Code: 201</b> <p>=> YAML NSD or VNFD File is Valid.</p>
        <b>Code: 501</b>{' '}
        <p>
          => 5G-Media validator returns Code: 501 if it cannot locate the file
          to be validated.
        </p>
        <b>Code: 502</b>{' '}
        <p>
          => 5G-Media validator returns Code: 502 if the schema file is not
          valid.
        </p>
        <b>Code: 503</b>{' '}
        <p>
          => 5G-Media validator returns Code: 503 if the NSD Yaml file is not
          valid.
        </p>
        <b>Code: 504</b>{' '}
        <p>
          => 5G-Media validator returns Code: 504 if the VNFD Yaml file is not
          valid.
        </p>
      </div>
    </Container>
  );
}
