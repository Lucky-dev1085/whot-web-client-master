import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { modal, modalContent, modalBackDrop } from './Modal.module.sass';
import LockBody from '../LockBody';

const Modal = ({ close, className, children }) => (
  <LockBody>
    <div className={modal}>
      <div className={modalBackDrop} onClick={close} />
      <div className={cx(className, modalContent)}>{children}</div>
    </div>
  </LockBody>
);

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default Modal;
