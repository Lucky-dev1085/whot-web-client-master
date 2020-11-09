import React, { Component } from 'react';

import { resetGreeting } from './ResetPassword.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import AuthLayout from '../../components/AuthLayout';
import Button from '../../components/Button';
import {
  TextInput,
  isFormValid,
  getFormValues
} from '../../components/FormControls';
import Toast from '../../components/Toast';

class ResetPassword extends Component {
  state = {
    formFields: {
      password: { value: '', isValid: false },
      passwordConfirm: { value: '', isValid: false }
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { match, resetPassword } = this.props;
    const { password } = getFormValues(this.state.formFields);
    const { token } = match.params;

    const userData = {
      password,
      token
    };

    resetPassword(userData);
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
    const { passwordResetError, resetAuthError } = this.props;
    passwordResetError && resetAuthError();
  }

  render() {
    const {
      location,
      authLoading,
      passwordResetError,
      resetAuthError
    } = this.props;
    const { formFields } = this.state;
    const { password, passwordConfirm } = formFields;
    const name = location.search.split('name=')[1];

    const isValidForm = isFormValid(formFields);

    return (
      <AuthLayout>
        <p className={resetGreeting}>
          <strong>Hi {name}!</strong> Reset Your Password
        </p>
        <form onSubmit={this.onSubmit}>
          <TextInput
            type="password"
            name="password"
            label="PASSWORD"
            value={password.value}
            required={true}
            onChange={this.onInputChange}
            placeholder="Set your password"
          />

          <TextInput
            type="password"
            name="passwordConfirm"
            label="CONFIRM PASSWORD"
            value={passwordConfirm.value}
            required={true}
            pattern={password.value}
            onChange={this.onInputChange}
            placeholder="Set your password"
          />

          <Button
            disabled={authLoading || !isValidForm}
            theme="secondary"
            block
          >
            CONFIRM AND SIGN IN
          </Button>
        </form>

        {passwordResetError && (
          <Toast
            type="error"
            message={passwordResetError}
            close={resetAuthError}
          />
        )}
      </AuthLayout>
    );
  }
}

export default UserConsumer(ResetPassword);
