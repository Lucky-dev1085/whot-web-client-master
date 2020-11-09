import React from 'react';

import TransactionHistory from './TransactionHistory';
import Add from './Add';
import Voucher from './Voucher';

import HistoryMenuIcon from '../../vectors/HistoryMenuIcon';
import PlusMenuIcon from '../../vectors/PlusMenuIcon';
import VoucherMenuIcon from '../../vectors/VoucherMenuIcon';

export const ROUTES = [
  {
    label: 'TRANSACTION HISTORY',
    path: '/deposit-pot/history',
    icon: <HistoryMenuIcon />,
    component: TransactionHistory
  },
  {
    label: 'ADD FUNDS',
    path: '/deposit-pot/add',
    icon: <PlusMenuIcon />,
    component: Add
  },
  {
    label: 'USE DEPOSIT VOUCHER',
    path: '/deposit-pot/voucher',
    icon: <VoucherMenuIcon />,
    component: Voucher
  }
];
