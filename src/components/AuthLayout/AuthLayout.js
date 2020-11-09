import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import { container } from './AuthLayout.module.sass';
import LogoAlt from '../../vectors/LogoAlt';

const AuthLayout = ({ children, className }) => (
  <section className={cx(container, className)}>
    <div>
      <header>
        <Link to="/">
          <LogoAlt />
        </Link>
      </header>
      {children}
    </div>
  </section>
);

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default AuthLayout;
