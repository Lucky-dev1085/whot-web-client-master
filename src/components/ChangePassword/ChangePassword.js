import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  changePassword,
  passwordAction,
  back
} from './ChangePassword.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import Button from '../../components/Button';
import {
  TextInput,
  isFormValid,
  getFormValues
} from '../../components/FormControls';
import Toast from '../../components/Toast';
import { FORM_FIELDS as defaultFormFields } from './ChangePassword.constants';

class ChangePassword extends Component {
  state = {
    formFields: defaultFormFields
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = getFormValues(this.state.formFields);
    this.props.updateUser(userData);
  };

  onInputChange = (name, value, isValid) => {
    const formFields = {
      ...this.state.formFields,
      [name]: { value, isValid }
    };

    this.setState({ formFields });
  };

  componentDidUpdate(prevProps) {
    const { profileSuccess } = this.props;

    if (!prevProps.profileSuccess && profileSuccess) {
      this.setState({ formFields: defaultFormFields });
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    const {
      profileError,
      resetAuthError,
      profileSuccess,
      resetAuthSuccess
    } = this.props;
    profileError && resetAuthError();
    profileSuccess && resetAuthSuccess();
  }

  render() {
    const {
      authLoading,
      profileSuccess,
      profileError,
      resetAuthSuccess,
      resetAuthError
    } = this.props;
    const { formFields } = this.state;
    const { password, passwordConfirm } = formFields;

    const isValidForm = isFormValid(formFields);

    return (
      <div className={changePassword}>
        <nav>
          <h5>CHANGE PASSWORD?</h5>
        </nav>

        <form onSubmit={this.onSubmit}>
          <TextInput
            type="password"
            name="password"
            label="PASSWORD"
            value={password.value}
            required={true}
            onChange={this.onInputChange}
            placeholder="Enter a new password"
          />

          <TextInput
            type="password"
            name="passwordConfirm"
            label="CONFIRM PASSWORD"
            value={passwordConfirm.value}
            required={true}
            pattern={password.value}
            onChange={this.onInputChange}
            placeholder="Re enter the password"
          />

          <div className={passwordAction}>
            <div className={back}>
              <Link to="/account/profile">BACK</Link>
            </div>
            <Button theme="secondary" disabled={authLoading || !isValidForm}>
              CONFIRM
            </Button>
          </div>
        </form>

        {profileSuccess && (
          <Toast
            message="Password updated successfully"
            close={resetAuthSuccess}
          />
        )}

        {profileError && (
          <Toast type="error" message={profileError} close={resetAuthError} />
        )}
      </div>
    );
  }
}

export default UserConsumer(ChangePassword);
