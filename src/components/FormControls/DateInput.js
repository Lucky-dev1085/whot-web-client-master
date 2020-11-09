import React, { forwardRef } from 'react';
import cx from 'classnames';

import {
  formControl,
  dateInput,
  datePlaceholder
} from './FormControl.module.sass';

const DateInput = ({ value, onClick, onFocus, onBlur, placeholder }, ref) => (
  <div
    ref={ref}
    tabIndex="0"
    className={cx(formControl, dateInput)}
    onClick={onClick}
    onFocus={onFocus}
    onBlur={onBlur}
  >
    {!value && <span className={datePlaceholder}>{placeholder}</span>}
    {value}
  </div>
);

export default forwardRef(DateInput);
