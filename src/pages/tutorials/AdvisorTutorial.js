import React from 'react';
import { Container } from 'reactstrap';
import svpAdvisor from 'assets/tutorial/svpAdvisor.png';

export default function AdvisorTutorial() {
  return (
    <Container>
      <div>
        <p>
          <br />
          <img src={svpAdvisor} alt="svpAdvisor" style={{ width: '100%' }} />
        </p>

        <p>The screenshot of the SVP Runtime Advisor is provided above. </p>

        <p>
          {' '}
          The developer can view how their application behaves in the production
          environment and obtain recommended resource values{' '}
        </p>

        <p>
          {' '}
          (a) The developer can view the log results by clicking the button
          specified by <b>(a)</b>{' '}
        </p>

        <p>
          {' '}
          (b) The developer can update the descriptors by clicking Update button
          specified by <b>(b)</b>{' '}
        </p>

        <p>
          {' '}
          (c) The developer can remove the logs of the application by clicking
          the button specified by <b>(c)</b>{' '}
        </p>
      </div>
    </Container>
  );
}
