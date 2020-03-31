import React from 'react';
import { Container } from 'reactstrap';
import packaging1 from 'assets/tutorial/packaging1.png';
import packaging2 from 'assets/tutorial/packaging2.png';
import packaging3 from 'assets/tutorial/packaging3.png';
import packaging4 from 'assets/tutorial/packaging4.png';

export default function PackagingTutorial() {
  return (
    <Container>
      <div>
        <p>
          <br />
          <p>The screenshots of the packaging tool is provided below. </p>
          <img src={packaging3} alt="packaging3" style={{ width: '100%' }} />
          <p>
            {' '}
            <b>(1)</b>{' '}
          </p>
          In the screenshot above that is specified by (1), the developer can
          create their repository and select what kind of repo they need,
          depending on what kind of VNF they will develop
          <img src={packaging4} alt="packaging4" style={{ width: '100%' }} />
          <p>
            {' '}
            <b>(2)</b>{' '}
          </p>
          In the screenshot above that is specified by (2), the developer can
          build their repository and provide its specs as well as check its
          status.
          <img src={packaging2} alt="packaging2" style={{ width: '100%' }} />
          <p>
            {' '}
            <b>(3)</b>{' '}
          </p>
          In the screenshot above that is specified by (3), the developer can
          test their container name and repo.
          <img src={packaging1} alt="packaging1" style={{ width: '100%' }} />
          <p>
            {' '}
            <b>(4)</b>{' '}
          </p>
          In the screenshot above that is specified by (4), the developer can
          push their repo to a given remote repo URL.
        </p>
      </div>
    </Container>
  );
}
