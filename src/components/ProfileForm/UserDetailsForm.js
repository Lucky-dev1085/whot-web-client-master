import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  profileActions,
  deleteAccount,
  adminEmail
} from './ProfileForm.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import Button from '../../components/Button';
import {
  UsernameInput,
  PhoneInput,
  isFormValid,
  getFormValues
} from '../../components/FormControls';
import { isValidPhone } from '../../utils';

class UserDetailsForm extends Component {
  constructor(props) {
    super(props);
    const {
      name,
      mobile,
      mobileVerificationTimestamp
    } = this.props.user.playerDetail;

    this.state = {
      formFields: {
        name: { value: name, isValid: true },
        mobile: {
          value: mobileVerificationTimestamp ? mobile : '',
          isValid: true
        }
      }
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { user, updateProfile } = this.props;
    const { name, mobile } = getFormValues(this.state.formFields);

    const userData = { name };

    if (!user.playerDetail.mobileVerificationTimestamp) {
      userData.mobile = mobile;
    }

    updateProfile(userData);
  };

  onInputChange = (name, value, isValid) => {
    const formFields = {
      ...this.state.formFields,
      [name]: { value, isValid }
    };

    this.setState({ formFields });
  };

  render() {
    const { user, authLoading } = this.props;
    const { name: username, mobileVerificationTimestamp } = user.playerDetail;
    const { formFields } = this.state;
    const { name, mobile } = formFields;

    const isValidForm = isFormValid(formFields);

    const phoneTip = 'Phone number cannot be changed';
    const verifiedPhoneTip = (
      <>
        <a className={adminEmail} href="mailto:admin@whot.ng">
          Contact admin
        </a>{' '}
        to change your phone number
      </>
    );

    return (
      <form onSubmit={this.onSubmit}>
        <UsernameInput
          username={username}
          name="name"
          label="USERNAME"
          value={name.value}
          required={true}
          onChange={this.onInputChange}
          placeholder="Set Username"
        />

        <PhoneInput
          name="mobile"
          label="PHONE NUMBER"
          value={mobile.value}
          validator={isValidPhone}
          onChange={this.onInputChange}
          placeholder="Set Phone Number"
          inputTip={mobileVerificationTimestamp ? verifiedPhoneTip : phoneTip}
          disabled={Boolean(mobileVerificationTimestamp)}
          maxLength={14}
        />

        <div className={profileActions}>
          <Button disabled={authLoading || !isValidForm} theme="secondary">
            SAVE
          </Button>

          <Link to="/account/profile/delete" className={deleteAccount}>
            DELETE MY ACCOUNT
          </Link>
        </div>
      </form>
    );
  }
}

export default UserConsumer(UserDetailsForm);
