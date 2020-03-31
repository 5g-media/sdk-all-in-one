import React from 'react';
import { Container } from 'reactstrap';
import osm1Screen from 'assets/tutorial/OSM1.png';
import osm2Screen from 'assets/tutorial/OSM2.png';

export default function EditorTutorial() {
  return (
    <Container>
      <div>
        <img src={osm2Screen} alt="OSM2" style={{ width: '100%' }} />
        <p>
          <br />
        </p>

        <p>
          OSM R5 has been exploited for 5G-MEDIA editor where developer can do
          the following actions as specified in the screenshot above
        </p>

        <p>
          (a) The developer can instantiate the network services by clicking{' '}
          <b>(a)</b>. In the pop-op window that will appear after clicking this
          button and the developer needs to specify to name of the service as
          well as the VIM to be used (i.e. vim-emu or faas-vim). In case of
          successful instantiation, the service instance will be running as
          given in the below screenshot.
        </p>

        <p>
          (b) The developer can edit their descriptors by clicking on the button
          referred with <b>(b)</b>
        </p>

        <p>
          (c) The developer can view the content by clicking on the button
          referred with <b>(c)</b>
        </p>

        <p>
          (d) The developer can clone the service by clicking on the button
          referred with <b>(d)</b>
        </p>

        <p>
          (e) The developer can visualize the VNF-FG graphs by clicking the
          button referred with <b>(e)</b>
        </p>

        <p>
          (f) The developer can download the package by clicking the button
          referred with <b>(f)</b>
        </p>

        <p>
          (g) The developer can remove the application or network service
          clicking the button referred with <b>(g)</b>{' '}
        </p>
        <img src={osm1Screen} alt="OSM1" style={{ width: '100%' }} />
      </div>
    </Container>
  );
}
