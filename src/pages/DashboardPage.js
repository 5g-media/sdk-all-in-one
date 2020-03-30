import React from 'react';

import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';

import Page from 'components/Page';

import ProductMedia from 'components/ProductMedia';

import MapWithBubbles from 'components/MapWithBubbles';
import { adminProductsData, developerProductsData } from 'constants/dashboardItems';

const DashboardPage = () => (
  <Page className="DashboardPage">
    <Row>
      <Col>
        <Card>
          <CardHeader heading tag="h4" >TUTORIALS</CardHeader>
          <CardBody>
            {(localStorage.getItem('isAdmin') === 'true'
              ? adminProductsData
              : developerProductsData
            ).map(({ id, image, title, description }) => (
              <ProductMedia
                key={id}
                id={id}
                image={image}
                title={title}
                description={description}
              />
            ))}
          </CardBody>
        </Card>
      </Col>

      <Col>
        <Card inverse className="bg-gradient-primary">
          <CardHeader heading tag="h4" className="bg-gradient-primary">consortium partners</CardHeader>
          <CardBody>
            <MapWithBubbles />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Page>
);

export default DashboardPage;
