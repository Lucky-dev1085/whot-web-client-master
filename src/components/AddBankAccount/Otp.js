import React, { useState, useEffect } from 'react';

import {
  otp,
  otpFormGroup,
  otpAction,
  back
} from './AddBankAccount.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import { TextInput } from '../../components/FormControls';
import Button from '../Button';

const formData = {
  value: '',
  isVaid: false
};

const Otp = ({
  goBack,
  user,
  authLoading,
  verifyBank,
  resetBankOtpData,
  addBankAccount,
  openBankOtp,
  closeBankOtp
}) => {
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
    verifyBank(code.value);
  };

  const resendOtp = () => {
    addBankAccount(resetBankOtpData);
  };

  useEffect(() => {
    return () => {
      openBankOtp && closeBankOtp();
    };
  }, [openBankOtp, closeBankOtp]);

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
            <span onClick={goBack}>BACK</span>
          </div>
          <Button disabled={!code.isVaid || authLoading} theme="secondary">
            CONFIRM
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserConsumer(Otp);
