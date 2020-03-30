import React from 'react';
import { Container } from 'reactstrap';

export default function GeneralInfo() {
  return (
    <Container>
      <br />
      <font face="tahoma" size="3" color="black">
        <b>Validator Web UI</b>
        <ul>
          <li>
            Validating descriptors (NSD and VNFD) against TOSCA and OSM schemas
          </li>
          <li>CSAR Packaging VNFs</li>
          <li>Onboarding descriptors to Private Catalogue</li>
        </ul>

        <b>Private Catalogue</b>
        <ul>
          <li>Onboarding VNFs and NSs to OSM</li>
          <li>Viewing function graphs</li>
          <li>Onboarding to Public Catalogue</li>
        </ul>

        <b>Emulator</b>
        <ul>
          <li>VIM-EMU for Openstack</li>
          <li>K8S-VIM for Lean OW</li>
        </ul>

        <b>Benchmarking</b>
        <ul>
          <li>Generate traffic for testing</li>
          <li>Simulation</li>
        </ul>

        <b>Monitoring</b>
        <ul>
          <li>Resource status check</li>
        </ul>
      </font>
    </Container>
  );
}
