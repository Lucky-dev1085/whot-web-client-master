import React from 'react';

import { withdrawalsCard } from './Withdrawals.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import SettingsLayout from '../../components/SettingsLayout';
import { ROUTES as routes } from './Withdrawals.constants';

const Withdrawals = ({ user }) => {
  return (
    <SettingsLayout
      title="WITHDRAWALS POT"
      cardClassName={withdrawalsCard}
      routes={routes}
      cardRender={
        <>
          <h3>MY WITHDRAWAL BAG</h3>
          <span>
            ₦
            {user.playerDetail.withdrawalBalance.toLocaleString('en-US', {
              maximumFractionDigits: 2
            })}
          </span>
        </>
      }
    />
  );
};

export default UserConsumer(Withdrawals);
