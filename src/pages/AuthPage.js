import React from 'react';
import { Card, Col, Row, Button } from 'reactstrap';

import AuthForm, { STATE_LOGIN } from 'components/AuthForm';

class AuthPage extends React.Component {
  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/signup');
    }
  };

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  handleConfigClick = () => {
    this.props.history.push('/config');
  };

  render() {
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Col md={6} lg={4}>
          <Card body>
            <AuthForm
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
            />
            <Button
              onClick={this.handleConfigClick}
              size="lg"
              className="bg-gradient-theme-left border-0"
              style={{ width: '100%' }}
            >
              Config Page
            </Button>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AuthPage;
