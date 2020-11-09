import React from 'react';

import TransactionHistory from './TransactionHistory';
import WithdrawToDeposit from './WithdrawToDeposit';
import WithdrawToAccount from './WithdrawToAccount';

import HistoryMenuIcon from '../../vectors/HistoryMenuIcon';
import PlusMenuIcon from '../../vectors/PlusMenuIcon';
import VoucherMenuIcon from '../../vectors/VoucherMenuIcon';

export const ROUTES = [
  {
    label: 'TRANSACTION HISTORY',
    path: '/withdrawals/history',
    icon: <HistoryMenuIcon />,
    component: TransactionHistory
  },
  {
    label: 'TRANSFER TO DEPOSIT',
    path: '/withdrawals/transfer-to-deposit',
    icon: <PlusMenuIcon />,
    component: WithdrawToDeposit
  },
  {
    label: 'TRANSFER TO ACCOUNT',
    path: '/withdrawals/transfer-to-account',
    icon: <VoucherMenuIcon />,
    component: WithdrawToAccount
  }
];
