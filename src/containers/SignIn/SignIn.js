import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { forgotPassword, signUp } from './SignIn.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import AuthLayout from '../../components/AuthLayout';
import Button from '../../components/Button';
import {
  EmailInput,
  TextInput,
  isFormValid,
  getFormValues
} from '../../components/FormControls';
import Toast from '../../components/Toast';

class SignIn extends Component {
  state = {
    formFields: {
      eAddress: { value: '', isValid: false },
      password: { value: '', isValid: false }
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { history, location, signIn } = this.props;
    const { eAddress, password } = getFormValues(this.state.formFields);

    const { from } = location.state || { from: { pathname: '/dashboard' } };
    const onSuccess = () => history.replace(from);

    signIn(
      {
        password,
        email: eAddress
      },
      onSuccess
    );
  };

  onInputChange = (name, value, isValid) => {
    const formFields = {
      ...this.state.formFields,
      [name]: { value, isValid }
    };

    this.setState({ formFields });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    const { signInError, resetAuthError } = this.props;
    signInError && resetAuthError();
  }

  render() {
    const { authLoading, signInError, resetAuthError } = this.props;
    const { formFields } = this.state;
    const { eAddress, password } = formFields;
    const isValidForm = isFormValid(formFields);

    return (
      <AuthLayout>
        <form onSubmit={this.onSubmit}>
          <EmailInput
            name="eAddress"
            label="EMAIL ADDRESS"
            value={eAddress.value}
            required={true}
            onChange={this.onInputChange}
            placeholder="Enter your email address"
          />

          <TextInput
            type="password"
            name="password"
            label="PASSWORD"
            value={password.value}
            required={true}
            onChange={this.onInputChange}
            placeholder="Enter your password"
          />

          <div className={forgotPassword}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <Button
            disabled={authLoading || !isValidForm}
            theme="secondary"
            block
          >
            SIGN IN
          </Button>

          <div className={signUp}>
            <Link to="/sign-up">New User? Sign up Now!</Link>
          </div>
        </form>

        {signInError && (
          <Toast type="error" message={signInError} close={resetAuthError} />
        )}
      </AuthLayout>
    );
  }
}

export default UserConsumer(SignIn);
