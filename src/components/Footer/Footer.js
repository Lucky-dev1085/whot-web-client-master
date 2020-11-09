import React from 'react';
import { Link } from 'react-router-dom';

import { footer, logo, footerLinks } from './Footer.module.sass';
import Logo from '../../vectors/Logo';

const Footer = () => (
  <footer className={footer}>
    <div className={logo}>
      <Logo />
    </div>
    <p>
      Mauris neque nunc, ornare a velit ut, pretium finibus tellus. Curabitur ut
      lorem. Mauris neque
    </p>
    <ul className={footerLinks}>
      <li>
        <Link to="/legal/privacy-policy">Privacy Policy</Link>
      </li>
      <li>
        <Link to="/legal/terms">Terms And Condition</Link>
      </li>
    </ul>
  </footer>
);

export default Footer;
