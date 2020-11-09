import React, { useState, useEffect } from 'react';

import {
  container,
  amountInput,
  quickSelections,
  formActions
} from './TransferToDeposit.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import { MoneyInput } from '../FormControls';
import Button from '../Button';
import Toast from '../Toast';
import { QUICK_AMOUNT_OPTIONS as amountOptions } from '../../config';

const TransferToDeposit = ({
  fundAccount,
  authLoading,
  accountFundingSuccess,
  accountFundingError,
  resetAuthSuccess,
  resetAuthError
}) => {
  const [amount, setAmount] = useState('');

  useEffect(() => {
    accountFundingSuccess && setAmount('');
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
      <h4>TRANSFER TO DEPOSIT BAG</h4>
      <MoneyInput
        className={amountInput}
        name="amount"
        label="AMOUNT"
        value={amount}
        onChange={(name, value) => setAmount(value)}
        placeholder="Enter fund amount"
      />

      <div className={quickSelections}>
        <h5>QUICK SELECTION</h5>
        {amountOptions.map(val => (
          <span key={val} onClick={() => setAmount(val)}>
            ₦{val.toLocaleString()}
          </span>
        ))}
      </div>

      <div className={formActions}>
        <Button
          onClick={() => fundAccount({ amount })}
          disabled={!amount || authLoading}
        >
          CONTINUE
        </Button>
      </div>
      {accountFundingSuccess && (
        <Toast
          message="Transfer to deposit bag was successful"
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

export default UserConsumer(TransferToDeposit);
