import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import logo200Image from 'assets/img/logo/logo_200.png';

let msg = '';
export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';
class AuthForm extends React.Component {
  state = {
    redirect: false,
  };

  componentDidMount() {
    localStorage.setItem('username', '');
    localStorage.removeItem('pass', '');
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  setRedirect = () => {
    if (localStorage.getItem('username') === localStorage.getItem('pass')) {
      if (localStorage.getItem('username') === 'admin') {
        localStorage.setItem('isAdmin', true);
      } else if (localStorage.getItem('username') === 'developer') {
        localStorage.setItem('isAdmin', false);
      }
      msg = '';
      this.setState({
        redirect: true,
      });
    } else {
      msg = 'check your username and password';
      this.setState({
        redirect: false,
      });
    }
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      const token = '123455'; // will be changed
      localStorage.setItem('giventoken', token);
      return <Redirect to="/dashboard" />;
    }
    return '';
  };

  handleInputChangePassword = event => {
    localStorage.setItem('pass', event.target.value);
  };

  handleInputChangeUsername = event => {
    if (event.target.value.toUpperCase() === 'ADMIN') {
      localStorage.setItem('username', 'admin');
    } else if (event.target.value.toUpperCase() === 'DEVELOPER') {
      localStorage.setItem('username', 'developer');
    } else localStorage.setItem('username', event.target.value);
  };

  renderButtonText = () => {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  };

  render() {
    const {
      showLogo,
      usernameLabel,
      alertLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
            />
          </div>
        )}
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input
            {...usernameInputProps}
            onChange={this.handleInputChangeUsername}
          />
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input
            {...passwordInputProps}
            onChange={this.handleInputChangePassword}
          />
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input {...confirmPasswordInputProps} />
          </FormGroup>
        )}
        <hr />
        {this.renderRedirect()}
        <Button
          type="submit"
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.setRedirect}
        >
          {this.renderButtonText()}
        </Button>
        <Label for={alertLabel}>{msg}</Label>

        {children}
      </Form>
    );
  }
}

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  // alertLabel: this.msg,
  usernameLabel: 'Username',
  usernameInputProps: {
    type: 'username',
    placeholder: 'your username',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => {},
};

export default AuthForm;
