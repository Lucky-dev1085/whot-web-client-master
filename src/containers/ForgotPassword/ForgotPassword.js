import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { container, formAction, back } from './ForgotPassword.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import AuthLayout from '../../components/AuthLayout';
import Button from '../../components/Button';
import { EmailInput } from '../../components/FormControls';
import Toast from '../../components/Toast';

class ForgotPassword extends Component {
  state = {
    formFields: {
      eAddress: { value: '', isValid: false }
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const email = this.state.formFields.eAddress.value;
    this.props.initiatePasswordReset(email.trim());
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
    const {
      passwordResetError,
      passwordResetSuccess,
      resetAuthError,
      resetAuthSuccess
    } = this.props;
    passwordResetError && resetAuthError();
    passwordResetSuccess && resetAuthSuccess();
  }

  render() {
    const {
      authLoading,
      passwordResetError,
      resetAuthError,
      passwordResetSuccess,
      resetAuthSuccess
    } = this.props;
    const { formFields } = this.state;
    const { eAddress } = formFields;

    return (
      <AuthLayout className={container}>
        <p>
          Enter the email address associated with your account to change your
          password.
        </p>
        <form onSubmit={this.onSubmit}>
          <EmailInput
            name="eAddress"
            label="EMAIL ADDRESS"
            value={eAddress.value}
            required={true}
            onChange={this.onInputChange}
            placeholder="Enter your email address"
          />

          <div className={formAction}>
            <div className={back}>
              <Link to="/sign-in">BACK</Link>
            </div>

            <Button
              disabled={authLoading || !eAddress.isValid}
              theme="secondary"
            >
              SEND RESET LINK
            </Button>
          </div>
        </form>

        {passwordResetSuccess && (
          <Toast
            message="Your password has been reset successfully"
            close={resetAuthSuccess}
          />
        )}

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

export default UserConsumer(ForgotPassword);
