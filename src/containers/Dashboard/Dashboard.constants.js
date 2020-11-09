import React from 'react';

import DepositPotIcon from '../../vectors/DepositPotIcon';
import WithdrawalIcon from '../../vectors/WithdrawalIcon';
import UserIcon from '../../vectors/UserIcon';

export const NAV_LINKS = [
  {
    label: 'DEPOSIT POT',
    to: '/deposit-pot',
    icon: <DepositPotIcon />
  },
  {
    label: 'WITHDRAWALS',
    to: '/withdrawals',
    icon: <WithdrawalIcon />
  },
  {
    label: 'MY ACCOUNT',
    to: '/account',
    icon: <UserIcon />
  }
];
