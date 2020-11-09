import React from 'react';
import { NavLink } from 'react-router-dom';

import { nav, activeLink } from './Legal.module.sass';

const Nav = () => (
  <nav className={nav}>
    <ul>
      <li>
        <NavLink to="/legal/privacy-policy" activeClassName={activeLink}>
          Privacy Policy
        </NavLink>
      </li>
      <li>
        <NavLink to="/legal/terms" activeClassName={activeLink}>
          Terms And Condition
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
