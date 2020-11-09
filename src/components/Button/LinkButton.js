import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './Button.module.sass';
import {
  SIZE_CLASS_NAMES as sizeClassNames,
  THEME_CLASS_NAMES as themeClassNames
} from './Button.constants';

const LinkButton = ({ children, to, className, size, theme, ...rest }) => (
  <Link
    to={to}
    className={cx(
      className,
      styles[sizeClassNames[size]],
      styles[themeClassNames[theme]],
      styles.linkBtn,
      styles.btn
    )}
    {...rest}
  >
    {children}
  </Link>
);

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['xs', 'sm', 'md']),
  theme: PropTypes.oneOf(['secondary'])
};

export default LinkButton;
