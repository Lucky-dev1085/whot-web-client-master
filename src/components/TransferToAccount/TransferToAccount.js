import React, { useState, useEffect } from 'react';

import {
  container,
  bankCard,
  amountInput,
  quickSelections,
  formActions
} from './TransferToAccount.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import BankAccounts from '../BankAccounts';
import { MoneyInput } from '../FormControls';
import Button from '../Button';
import Toast from '../Toast';
import { QUICK_AMOUNT_OPTIONS as amountOptions } from '../../config';

const TransferToAccount = ({
  transferToBankAccount,
  authLoading,
  accountWithdrawalSuccess,
  accountWithdrawalError,
  resetAuthSuccess,
  resetAuthError
}) => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [amount, setAmount] = useState('');
  const { name, accountNumber } = selectedBank || {};

  const tranferFund = () => {
    const data = {
      amount,
      playerBankAccountId: selectedBank.id
    };
    transferToBankAccount(data);
  };

  useEffect(() => {
    accountWithdrawalSuccess && setSelectedBank(null);
  }, [accountWithdrawalSuccess]);

  useEffect(() => {
    return () => {
      accountWithdrawalSuccess && resetAuthSuccess();
      accountWithdrawalError && resetAuthError();
    };
  }, [
    accountWithdrawalSuccess,
    accountWithdrawalError,
    resetAuthSuccess,
    resetAuthError
  ]);

  return (
    <>
      {selectedBank ? (
        <div className={container}>
          <h4>TRANSFER TO BANK ACCOUNT</h4>
          <div className={bankCard}>
            <h4>{name}</h4>
            <p>
              ACCOUNT ENDING WITH <span>{accountNumber.substring(6, 10)}</span>
            </p>
          </div>
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
            <span onClick={() => setSelectedBank(false)}>CANCEL</span>
            <Button onClick={tranferFund} disabled={!amount || authLoading}>
              CONFIRM
            </Button>
          </div>
        </div>
      ) : (
        <BankAccounts
          label="TRANSFER TO BANK ACCOUNT"
          listLabel="CHOOSE BANK ACCOUNT"
          selectedColor="#F1B77D"
          onSelectComplete={setSelectedBank}
        />
      )}
      {accountWithdrawalSuccess && (
        <Toast
          message="Transfer to bank account was successful"
          close={resetAuthSuccess}
        />
      )}
      {accountWithdrawalError && (
        <Toast
          type="error"
          message={accountWithdrawalError}
          close={resetAuthError}
        />
      )}
    </>
  );
};

export default UserConsumer(TransferToAccount);
