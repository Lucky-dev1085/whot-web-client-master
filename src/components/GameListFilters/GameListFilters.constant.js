export const STAKE_AMOUNT_OPTIONS = [
  {
    label: 'All',
    value: {}
  },
  {
    label: 'UP TO ₦500',
    value: { 'stakeAmount[$lt]': 500 }
  },
  {
    label: '₦500 TO ₦2,500',
    value: { 'stakeAmount[$gt]': 500, 'stakeAmount[$lt]': 2500 }
  },
  {
    label: '₦2,500 TO ₦5,000',
    value: { 'stakeAmount[$gt]': 2500, 'stakeAmount[$lt]': 5000 }
  },
  {
    label: '₦5,000 TO ₦10,000',
    value: { 'stakeAmount[$gt]': 5000, 'stakeAmount[$lt]': 10000 }
  },
  {
    label: 'MORE THAN ₦10,000',
    value: { 'stakeAmount[$gt]': 10000 }
  }
];

export const MIN_STAKE_AMOUNT_OPTIONS = [
  {
    label: 'All',
    value: {}
  },
  {
    label: 'UP TO ₦500',
    value: { 'minStakeAmount[$lt]': 500 }
  },
  {
    label: '₦500 TO ₦2,500',
    value: { 'minStakeAmount[$gt]': 500, 'minStakeAmount[$lt]': 2500 }
  },
  {
    label: '₦2,500 TO ₦5,000',
    value: { 'minStakeAmount[$gt]': 2500, 'minStakeAmount[$lt]': 5000 }
  },
  {
    label: '₦5,000 TO ₦10,000',
    value: { 'minStakeAmount[$gt]': 5000, 'minStakeAmount[$lt]': 10000 }
  },
  {
    label: 'MORE THAN ₦10,000',
    value: { 'minStakeAmount[$gt]': 10000 }
  }
];
