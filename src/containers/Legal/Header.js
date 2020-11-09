import React from 'react';
import { Link } from 'react-router-dom';

import { header, signInButton } from './Legal.module.sass';
import { LinkButton } from '../../components/Button';
import LogoAlt from '../../vectors/LogoAlt';

const Header = () => (
  <header className={header}>
    <Link to="/">
      <LogoAlt />
    </Link>
    <LinkButton
      to="/sign-in"
      theme="secondary"
      size="sm"
      className={signInButton}
    >
      SIGN IN
    </LinkButton>
  </header>
);

export default Header;
