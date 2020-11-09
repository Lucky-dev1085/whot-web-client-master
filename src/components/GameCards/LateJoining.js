import React from 'react';
import PropTypes from 'prop-types';

import { latejoining, confirmButton } from './GameCards.module.sass';
import Button from '../Button';

const LateJoining = ({ tournamentTitle, close }) => (
  <div className={latejoining}>
    <p>
      You cannot join the following game as the{' '}
      <strong>{tournamentTitle}</strong> is going to start in less than 20 mins
    </p>
    <Button block theme="secondary" className={confirmButton} onClick={close}>
      CONTINUE
    </Button>
  </div>
);

LateJoining.propTypes = {
  tournamentTitle: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
};

export default LateJoining;
