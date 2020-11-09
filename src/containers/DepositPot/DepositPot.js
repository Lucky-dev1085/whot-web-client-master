import React from 'react';

import { depositCard } from './DepositPot.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import SettingsLayout from '../../components/SettingsLayout';
import { ROUTES as routes } from './DepositPot.constants';

const DepositPot = ({ user }) => {
  return (
    <SettingsLayout
      title="DEPOSIT POT"
      cardClassName={depositCard}
      routes={routes}
      cardRender={
        <>
          <h3>MY DEPOSIT BAG</h3>
          <span>
            ₦
            {user.playerDetail.depositBalance.toLocaleString('en-US', {
              maximumFractionDigits: 2
            })}
          </span>
        </>
      }
    />
  );
};

export default UserConsumer(DepositPot);
