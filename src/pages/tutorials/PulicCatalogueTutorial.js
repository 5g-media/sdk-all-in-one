import React from 'react';
import { Container } from 'reactstrap';
import publicCatalogue from 'assets/tutorial/publicCatalogue.png';

export default function PulicCatalogueTutorial() {
  return (
    <Container>
      <div>
        <p>The screenshot of the public catalogue is provided below. </p>

        <p>
          {' '}
          While all operations with descriptors are identical with those of
          private catalogue, the main difference is the developer needs to sign
          in to the platform and get a token in order to be able to use public
          catalogue.{' '}
        </p>

        <p>
          <br />
          <img
            src={publicCatalogue}
            alt="pubCatalogue"
            style={{ width: '100%' }}
          />
        </p>
      </div>
    </Container>
  );
}
