import React, { useState } from 'react';

import { otp, otpFormGroup, otpAction, back } from './ProfileForm.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import { TextInput } from '../../components/FormControls';
import Button from '../Button';

const formData = {
  value: '',
  isVaid: false
};

const Otp = ({ closeMobileOtp, user, verifyProfile, updateProfile }) => {
  const [code, setCode] = useState(formData);
  const { mobile } = user.playerDetail;
  const withCountryCode = mobile.substring(0, 4) === '+234';
  const mobilePrefix = withCountryCode
    ? mobile.substring(0, 7)
    : mobile.substring(0, 4);

  const onCodeChange = (name, value, isVaid) => {
    setCode({ value, isVaid });
  };

  const onSubmit = e => {
    e.preventDefault();
    verifyProfile(code.value);
  };

  const resendOtp = () => {
    updateProfile({ mobile }, true);
  };

  return (
    <div className={otp}>
      <p>
        We have sent an OTP to your <br />
        registered Mobile Number {mobilePrefix} XXXXXXX
      </p>
      <form onSubmit={onSubmit}>
        <div className={otpFormGroup}>
          <TextInput
            name="name"
            value={code.value}
            required={true}
            onChange={onCodeChange}
            placeholder="Enter OTP"
            maxLength={6}
            minLength={6}
          />
          <span onClick={resendOtp}>SEND AGAIN</span>
        </div>
        <div className={otpAction}>
          <div className={back}>
            <span onClick={closeMobileOtp}>BACK</span>
          </div>
          <Button disabled={!code.isVaid} theme="secondary">
            CONFIRM
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserConsumer(Otp);
