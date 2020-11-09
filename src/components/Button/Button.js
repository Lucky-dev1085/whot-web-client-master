import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './Button.module.sass';
import {
  SIZE_CLASS_NAMES as sizeClassNames,
  THEME_CLASS_NAMES as themeClassNames
} from './Button.constants';

const Button = ({ children, className, block, size, theme, ...rest }) => (
  <button
    className={cx(
      className,
      styles[sizeClassNames[size]],
      styles[themeClassNames[theme]],
      styles.btn,
      { [styles.btnBlock]: block }
    )}
    {...rest}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  block: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md']),
  theme: PropTypes.oneOf(['secondary', 'transparent'])
};

export default Button;
