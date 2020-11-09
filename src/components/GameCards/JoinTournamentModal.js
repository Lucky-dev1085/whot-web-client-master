import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  modal,
  modalBackdrop,
  modalContent,
  tournamentSummary,
  tournamentWinning,
  detailsText,
  tournamentInfoPill,
  confirmButton
} from './GameCards.module.sass';
import { GamesConsumer } from '../../contexts/GamesContext';
import LateJoining from './LateJoining';
import Toast from '../Toast';
import Button from '../Button';
import TrophyIcon from '../../vectors/TrophyIcon';
import CirclePurse from '../../vectors/CirclePurse';
import CircleClock from '../../vectors/CircleClock';
import CirclePlayers from '../../vectors/CirclePlayers';

const JoinTournamentModal = ({
  joinTournament,
  id,
  tournamentTitle,
  prizeAmount,
  stakeAmount,
  startingAt,
  playerCount,
  maxPlayerCount,
  gameLoading,
  joinGameError,
  resetGameError,
  close
}) => {
  const isLateEntry = moment().isAfter(moment(startingAt).subtract(20, 'm'));

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
            <h4>{tournamentTitle}</h4>
          </header>
          {isLateEntry ? (
            <LateJoining tournamentTitle={tournamentTitle} close={close} />
          ) : (
            <div className={tournamentSummary}>
              <p>THE PRIZE FOR THE TOURNAMENT</p>

              <span className={tournamentWinning}>
                <TrophyIcon /> ₦{prizeAmount.toLocaleString()}
              </span>

              <p className={detailsText}>
                PLEASE GO THROUGH THE <br /> TOURNAMENT DETAILS:
              </p>

              <div>
                <span className={tournamentInfoPill}>
                  <CirclePurse /> ₦{stakeAmount.toLocaleString()}
                </span>
                <span className={tournamentInfoPill}>
                  <CircleClock background="#433445" />{' '}
                  {moment(startingAt).format('h:mm A')}
                </span>
              </div>

              <div>
                <span className={tournamentInfoPill}>
                  <CirclePlayers background="#433445" /> {playerCount}/
                  {maxPlayerCount}
                </span>
              </div>

              <Button
                block
                theme="secondary"
                disabled={gameLoading}
                className={confirmButton}
                onClick={() => joinTournament({ tournamentId: id })}
              >
                CONFIRM AND JOIN
              </Button>
            </div>
          )}
        </div>
        {joinGameError && (
          <Toast type="error" message={joinGameError} close={resetGameError} />
        )}
      </div>
    </div>
  );
};

JoinTournamentModal.propTypes = {
  close: PropTypes.func.isRequired,
  tournamentTitle: PropTypes.string,
  prizeAmount: PropTypes.number,
  stakeAmount: PropTypes.number,
  startingAt: PropTypes.string,
  playerCount: PropTypes.number,
  maxPlayerCount: PropTypes.number
};

export default GamesConsumer(JoinTournamentModal);
