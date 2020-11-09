import React from 'react';

import Profile from './Profile';
import BankAccounts from './BankAccounts';
import Settings from './Settings';

import PlusMenuIcon from '../../vectors/PlusMenuIcon';
import NairaMenuIcon from '../../vectors/NairaMenuIcon';
import CogMenuIcon from '../../vectors/CogMenuIcon';

export const ROUTES = [
  {
    label: 'EDIT PROFILE',
    path: '/account/profile',
    icon: <PlusMenuIcon />,
    component: Profile
  },
  {
    label: 'MY BANK ACCOUNTS',
    path: '/account/bank-accounts',
    icon: <NairaMenuIcon />,
    component: BankAccounts
  },
  {
    label: 'ACCOUNT SETTINGS',
    path: '/account/settings',
    icon: <CogMenuIcon />,
    component: Settings
  }
];
