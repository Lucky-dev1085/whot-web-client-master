import React from 'react';

import { accountCard, logoutLink } from './Account.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import SettingsLayout from '../../components/SettingsLayout';
import ExitMenuIcon from '../../vectors/ExitMenuIcon';
import { ROUTES as routes } from './Account.constants';

const Account = ({ logout, user }) => {
  const { name } = user.playerDetail;

  return (
    <SettingsLayout
      title="MY ACCOUNT"
      cardClassName={accountCard}
      routes={routes}
      cardRender={
        <>
          <h3>{name}</h3>
          <span>{name}</span>
        </>
      }
      asideBottomRender={
        <span className={logoutLink} onClick={logout}>
          <ExitMenuIcon /> LOGOUT
        </span>
      }
    />
  );
};

export default UserConsumer(Account);
