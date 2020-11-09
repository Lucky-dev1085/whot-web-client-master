import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import {
  container,
  accountBalance,
  nav,
  actions,
  tournaments
} from './Dashboard.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import { LinkButton } from '../../components/Button';
import LogoAlt from '../../vectors/LogoAlt';
import LogoutIcon from '../../vectors/LogoutIcon';
import FeaturedTournaments from '../../components/FeaturedTournaments';
import { JoinPrivateGameModal } from '../../components/GameCards';
import { NAV_LINKS as navLinks } from './Dashboard.constants';

const Dashboard = ({ user, logout, match, location }) => {
  const [closeJoin, setCloseJoin] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { token } = match.params;

  return (
    <>
      {token && closeJoin && <Redirect to="/" />}
      <main className={container}>
        <div>
          <header>
            <LogoAlt />
            <Link to="/deposit-pot" className={accountBalance}>
              ₦
              {user.playerDetail.depositBalance.toLocaleString('en-US', {
                maximumFractionDigits: 2
              })}
            </Link>
          </header>
          <nav className={nav}>
            <ul>
              {navLinks.map(({ label, to, icon }, index) => (
                <li key={index}>
                  <Link to={to}>
                    {icon}
                    <h6>{label}</h6>
                  </Link>
                </li>
              ))}
              <li>
                <div onClick={logout}>
                  <LogoutIcon />
                  <h6>LOGOUT</h6>
                </div>
              </li>
            </ul>
          </nav>
          <div className={actions}>
            <LinkButton to="/daily-games" size="sm" theme="secondary">
              DAILY GAMES
            </LinkButton>
            <LinkButton to="/create-game" size="sm">
              CREATE TABLE
            </LinkButton>
          </div>
          <div className={tournaments}>
            <nav>
              <span>ONLINE TOURNAMENTS</span>
              <Link to="/tournaments">SEE ALL</Link>
            </nav>
            <FeaturedTournaments />
          </div>
        </div>
      </main>
      {token && (
        <JoinPrivateGameModal
          token={token}
          location={location}
          close={() => setCloseJoin(true)}
        />
      )}
    </>
  );
};

export default UserConsumer(Dashboard);
