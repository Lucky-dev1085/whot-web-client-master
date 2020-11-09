import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  modal,
  modalBackdrop,
  modalContent,
  gameWinningSummary,
  gameWinning,
  gameWinningTrophy,
  detailsText,
  confirmButton
} from './GameCards.module.sass';
import { GamesConsumer } from '../../contexts/GamesContext';
import Button from '../Button';
import Toast from '../Toast';
import TrophyIcon from '../../vectors/TrophyIcon';

const JoinDailyGameModal = ({
  joinGame,
  id,
  tableTitle,
  minStakeAmount,
  gameLoading,
  joinGameError,
  resetGameError,
  close
}) => {
  useEffect(() => {
    return () => {
      joinGameError && resetGameError();
    };
  }, [joinGameError, resetGameError]);

  return (
    <div className={modal}>
      <div>
        <div className={modalBackdrop} onClick={close} />
        <div className={modalContent}>
          <header>
            <h4>{tableTitle}</h4>
          </header>
          <div className={gameWinningSummary}>
            <p>THIS GAME HAS A STAKE AMOUNT OF</p>

            <span className={gameWinning}>
              ₦{minStakeAmount.toLocaleString()}
            </span>

            <div className={gameWinningTrophy}>
              <TrophyIcon />
            </div>

            <p className={detailsText}>5% OF ALL WINNINGS GO TO THE HOUSE.</p>

            <Button
              block
              theme="secondary"
              disabled={gameLoading}
              className={confirmButton}
              onClick={() => joinGame({ gameTableId: id })}
            >
              CONFIRM AND JOIN
            </Button>
          </div>
        </div>
        {joinGameError && (
          <Toast type="error" message={joinGameError} close={resetGameError} />
        )}
      </div>
    </div>
  );
};

JoinDailyGameModal.propTypes = {
  close: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  tableTitle: PropTypes.string,
  minStakeAmount: PropTypes.number
};

export default GamesConsumer(JoinDailyGameModal);
