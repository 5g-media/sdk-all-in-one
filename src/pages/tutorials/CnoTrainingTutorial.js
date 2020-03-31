import React from 'react';
import { Container } from 'reactstrap';
import cnoTrainingGraph from 'assets/tutorial/cno1.png';

export default function CnoTrainingTutorial() {
  return (
    <Container>
      <div>
        <p>
          <br />
          <img
            src={cnoTrainingGraph}
            alt="CnoTrainingUI"
            style={{ width: '100%' }}
          />
        </p>

        <p>The screenshot of the CNO Training GUI is provided above. </p>

        <p>
          {' '}
          The developer can simply fill in the following parameters to build a
          training model{' '}
        </p>

        <p>
          {' '}
          (a) The developer can specify the name of the training model of their
          choice by simply typing in the text field specified by <b>(a)</b>{' '}
        </p>

        <p>
          {' '}
          (b) The developer can select the training data by clicking Upload
          button specified by <b>(b)</b>{' '}
        </p>

        <p>
          {' '}
          (c) The developer can select reward function construction type in the
          options specified by <b>(c)</b>{' '}
        </p>

        <p>
          {' '}
          (d) The developer can select background traffic pattern type in the
          options specified by <b>(d)</b>
        </p>

        <p>
          {' '}
          (e) The developer can type weight parameter for mean loss rate in text
          field specified by <b>(e)</b>
        </p>

        <p>
          {' '}
          (f) The developer can type actor learning rate in text field specified
          by <b>(f)</b>{' '}
        </p>

        <p>
          {' '}
          (g) The developer can type critic learning rate in text field
          specified by <b>(g)</b>
        </p>

        <p>
          {' '}
          (h) The developer can type link capacity in Mbps in text field
          specified by <b>(h)</b>
        </p>

        <p>
          {' '}
          (i) The developer can type number of parallel agents in text field
          specified by <b>(i)</b>{' '}
        </p>

        <p>
          {' '}
          (j) The developer can type number of seed in text field specified by{' '}
          <b>(j)</b>{' '}
        </p>

        <p>
          {' '}
          (k) The developer can start training by clicking the button specified
          by <b>(k)</b>
        </p>

        <p>
          {' '}
          (l) The developer can stop the button by clicking the button specified
          by <b>(l)</b>{' '}
        </p>

        <p>
          {' '}
          (m) The developer can start the tensorboard by clicking the button
          specified by <b>(m)</b> so that the visualisation of the performance
          of training model can be obtained on the left hand side of the window.
        </p>

        <p>
          {' '}
          (o) The developer can refresh the results by clicking the button
          specified by <b>(o)</b>
        </p>

        <p>
          {' '}
          (1) The developer can change the smoothness of the graphs by adjusting
          the selector specified by <b>(1)</b>
        </p>

        <p>
          {' '}
          (2) The developer can view the performance of the training model in
          the graphs specified by <b>(2)</b>{' '}
        </p>

        <p>
          {' '}
          (n) The developer can deploy the model to SVP by clicking the button
          specified by <b>(n)</b>{' '}
        </p>
      </div>
    </Container>
  );
}
