import React, { useState } from 'react';
import PaystackButton from 'react-paystack';

import {
  container,
  amountInput,
  quickSelections,
  formActions
} from './AddFunds.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import { MoneyInput } from '../FormControls';
import {
  QUICK_AMOUNT_OPTIONS as amountOptions,
  PAYSTACK_KEY as paystackkey
} from '../../config';

const AddFunds = ({ user, getProfile }) => {
  const [amount, setAmount] = useState('');
  const { email, playerDetail } = user;

  const getReference = () => {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=';
    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  const onPaystackComplete = () => {
    setAmount('');
    getProfile();
  };

  return (
    <div className={container}>
      <h4>ADD FUNDS</h4>
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
        <PaystackButton
          text="CONTINUE"
          className="payButton"
          callback={onPaystackComplete}
          close={() => {}}
          disabled={!amount}
          reference={getReference()}
          email={email}
          amount={amount ? amount * 100 : 0}
          metadata={{ playerId: playerDetail.id }}
          paystackkey={paystackkey}
          tag="button"
        />
      </div>
    </div>
  );
};

export default UserConsumer(AddFunds);
