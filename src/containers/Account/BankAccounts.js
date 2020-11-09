import React from 'react';
import { Route } from 'react-router-dom';

import BankAccounts from '../../components/BankAccounts';
import AddBankAccount from '../../components/AddBankAccount';

const BankAccount = () => (
  <>
    <Route exact path="/account/bank-accounts" component={BankAccounts} />
    <Route exact path="/account/bank-accounts/add" component={AddBankAccount} />
  </>
);

export default BankAccount;
