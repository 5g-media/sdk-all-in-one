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
          <li>Exporting descriptors to your local development environment</li>
        </ul>

        <b>Private Catalogue</b>
        <ul>
          <li>
            Onboarding VNFs and NSs to the OSM of the development environment
          </li>
          <li>Viewing VNF forwarding graphs</li>
          <li>Onboarding to Public Catalogue</li>
        </ul>

        <b>Emulator</b>
        <ul>
          <li>VIM-EMU for non-FaaS Applications</li>
          <li>FaaS-VIM for FaaS Applications</li>
        </ul>

        <b>Benchmarking</b>
        <ul>
          <li>Generate traffic for testing</li>
          <li>Simulation</li>
        </ul>

        <b>Service Monitoring</b>
        <ul>
          <li>Resource status check</li>
          <li>Visualize metrics of the emulated/benchmarked VNFs</li>
        </ul>

        <b>CNO Training GUI</b>
        <ul>
          <li>Building training models based on reinforcement learning</li>
          <li>
            Visualizing the performance metrics of training models with respect
            to loss, entropy and reward
          </li>
        </ul>

        <b>SVP Runtime Advisor</b>
        <ul>
          <li>
            Get feedbacks for the applications you developed and deployed in the
            production environment
          </li>
          <li>
            Get recommendations for resource flavours and update your
            descripters accordingly
          </li>
        </ul>
      </font>
    </Container>
  );
}
