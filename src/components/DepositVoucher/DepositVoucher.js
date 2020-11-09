import React, { useState, useRef, useEffect } from 'react';

import {
  container,
  voucherInput,
  codeCharacters,
  inputBlink,
  formActions
} from './DepositVoucher.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import Button from '../Button';
import Toast from '../../components/Toast';

const DepositVoucher = ({
  authLoading,
  fundAccount,
  accountFundingSuccess,
  accountFundingError,
  resetAuthSuccess,
  resetAuthError
}) => {
  const [serial, setSerial] = useState('');
  const [serialFocused, setSerialFocused] = useState(false);
  const characterBoxes = Array(8).fill(0);
  const serialInput = useRef(null);

  const onSubmit = e => {
    e.preventDefault();
    serialInput.current.blur();
    fundAccount({ serial });
  };

  useEffect(() => serialInput.current.focus(), []);
  useEffect(() => {
    accountFundingSuccess && setSerial('');
  }, [accountFundingSuccess]);

  useEffect(() => {
    return () => {
      accountFundingSuccess && resetAuthSuccess();
      accountFundingError && resetAuthError();
    };
  }, [
    accountFundingSuccess,
    accountFundingError,
    resetAuthSuccess,
    resetAuthError
  ]);

  return (
    <div className={container}>
      <h4>DEPOSIT VOUCHER</h4>
      <p>
        Enter the 8 digit deposit voucher <br /> code to receive the amount.
      </p>

      <form onSubmit={onSubmit}>
        <input
          ref={serialInput}
          className={voucherInput}
          value={serial}
          onChange={e => setSerial(e.target.value)}
          onFocus={() => setSerialFocused(true)}
          onBlur={() => setSerialFocused(false)}
          maxLength={8}
        />

        <div
          className={codeCharacters}
          onClick={() => serialInput.current.focus()}
        >
          {characterBoxes.map((val, index) => (
            <div key={index}>
              <span>
                {serial[index]}
                {serialFocused && serial.length === index && (
                  <span className={inputBlink}>|</span>
                )}
              </span>
            </div>
          ))}
        </div>

        <div className={formActions}>
          <Button
            theme="secondary"
            disabled={serial.length !== 8 || authLoading}
          >
            CONFIRM
          </Button>
        </div>
      </form>
      {accountFundingSuccess && (
        <Toast
          message="Deposit completed successfully"
          close={resetAuthSuccess}
        />
      )}
      {accountFundingError && (
        <Toast
          type="error"
          message={accountFundingError}
          close={resetAuthError}
        />
      )}
    </div>
  );
};

export default UserConsumer(DepositVoucher);
