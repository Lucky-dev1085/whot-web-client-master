import Request from '../../utils/requests';

export const users = new Request('/users');
export const signIn = new Request('/auth/login');
export const passwordReset = new Request('/auth/password-reset');
export const playerDetails = new Request('/player-details');
export const playerVerification = new Request('/player-verification');
export const playerBankAccounts = new Request('/player-bank-accounts');
export const playerBankAccountsVerification = new Request(
  '/player-bank-accounts-verification'
);
export const accountFunding = new Request('/player-account-funding');
export const accountWithdrawals = new Request('/player-withdrawals');
