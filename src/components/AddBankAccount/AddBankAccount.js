import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { addBankAccount } from './AddBankAccount.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import SelectBank from './SelectBank';
import NewAccountDetails from './NewAccountDetails';
import Otp from './Otp';
import Toast from '../../components/Toast';

const AddBankAccount = ({
  bankAccountSuccess,
  bankAccountError,
  resetAuthSuccess,
  resetAuthError,
  openBankOtp,
  resendBankOtpSuccess,
  history
}) => {
  const [bank, setBank] = useState('');
  const [step, setStep] = useState(0);

  const saveBank = bank => {
    setBank(bank);
    setStep(1);
  };

  useEffect(() => {
    return () => {
      bankAccountError && resetAuthError();
      resendBankOtpSuccess && resetAuthSuccess();
    };
  }, [
    resendBankOtpSuccess,
    bankAccountError,
    resetAuthSuccess,
    resetAuthError
  ]);

  return (
    <div className={addBankAccount}>
      <h5>
        MY BANK ACCOUNTS <span> > </span> ADD ACCOUNT
      </h5>
      {step === 0 && (
        <SelectBank
          goBack={history.goBack}
          selectedBank={bank}
          saveBank={saveBank}
        />
      )}

      {step === 1 &&
        (openBankOtp ? (
          <Otp goBack={() => setStep(0)} />
        ) : (
          <NewAccountDetails bankId={bank} goBack={() => setStep(0)} />
        ))}

      {bankAccountSuccess && <Redirect to="/account/bank-accounts" />}
      {resendBankOtpSuccess && (
        <Toast
          message="We’ve sent you a new one time password"
          close={resetAuthSuccess}
        />
      )}
      {bankAccountError && (
        <Toast type="error" message={bankAccountError} close={resetAuthError} />
      )}
    </div>
  );
};

export default UserConsumer(AddBankAccount);
