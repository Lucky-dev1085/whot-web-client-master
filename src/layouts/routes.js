import Home from '../containers/Home';
import Legal from '../containers/Legal';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import ForgotPassword from '../containers/ForgotPassword';
import ResetPassword from '../containers/ResetPassword';
import Dashboard from '../containers/Dashboard';
import Account from '../containers/Account';
import DepositPot from '../containers/DepositPot';
import Withdrawals from '../containers/Withdrawals';
import DailyGames from '../containers/DailyGames';
import Tournaments from '../containers/Tournaments';
import CreateGame from '../containers/CreateGame';
import GamePlay from '../containers/GamePlay';

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/legal',
    component: Legal
  },
  {
    path: '/sign-in',
    component: SignIn,
    exact: true
  },
  {
    path: '/sign-up',
    component: SignUp,
    exact: true
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    exact: true
  },
  {
    path: '/reset-password/:token',
    component: ResetPassword,
    exact: true
  },
  {
    path: '/dashboard',
    component: Dashboard,
    exact: true,
    isPrivate: true
  },
  {
    path: '/join/:token',
    component: Dashboard,
    isPrivate: true
  },
  {
    path: '/account',
    component: Account,
    isPrivate: true
  },
  {
    path: '/deposit-pot',
    component: DepositPot,
    isPrivate: true
  },
  {
    path: '/withdrawals',
    component: Withdrawals,
    isPrivate: true
  },
  {
    path: '/daily-games',
    component: DailyGames,
    isPrivate: true
  },
  {
    path: '/tournaments',
    component: Tournaments,
    isPrivate: true
  },
  {
    path: '/create-game',
    component: CreateGame,
    isPrivate: true
  },
  {
    path: '/play/:id',
    component: GamePlay,
    isPrivate: true
  }
];
