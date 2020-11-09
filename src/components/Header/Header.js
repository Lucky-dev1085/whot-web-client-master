import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  header,
  homeLink,
  title,
  accountDetails,
  accountBalance
} from './Header.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import LogoAlt from '../../vectors/LogoAlt';
import HamburgerIcon from '../../vectors/HamburgerIcon';
import NotificationsIcon from '../../vectors/NotificationsIcon';
import MoneyBagIcon from '../../vectors/MoneyBagIcon';

const Header = ({ user, routeLabel }) => (
  <header className={header}>
    <div>
      <Link className={homeLink} to="/">
        <LogoAlt />
      </Link>
      <span className={title}>{routeLabel}</span>
    </div>
    <div className={accountDetails}>
      <span className={accountBalance}>
        <MoneyBagIcon /> ₦
        {user.playerDetail.depositBalance.toLocaleString('en-US', {
          maximumFractionDigits: 2
        })}
      </span>
      <span>
        <NotificationsIcon />
      </span>
      <span>
        <HamburgerIcon />
      </span>
    </div>
  </header>
);

Header.propTypes = {
  routeLabel: PropTypes.string.isRequired
};

export default UserConsumer(Header);
