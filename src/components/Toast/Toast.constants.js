import React from 'react';
import WarningIcon from '../../vectors/WarningIcon';
import SuccessIcon from '../../vectors/SuccessIcon';

export const TYPE_CLASS_NAMES = {
  success: 'successToast',
  error: 'errorToast'
};

export const TYPE_ICON = {
  success: <SuccessIcon />,
  error: <WarningIcon />
};
