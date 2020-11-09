import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  modal,
  modalBackdrop,
  modalContent,
  privateGameSummary,
  loading,
  joinActions
} from './GameCards.module.sass';
import { GamesConsumer } from '../../contexts/GamesContext';
import { UserConsumer } from '../../contexts/UserContext';
import Button from '../Button';
import Toast from '../Toast';
import CircleNaira from '../../vectors/CircleNaira';

const JoinPrivateGameModal = ({
  location,
  joinGame,
  getProfile,
  token,
  gameLoading,
  getGameId,
  joinGameSuccess,
  joinGameError,
  resetGameError,
  close
}) => {
  const [gameTableId, setGameTableId] = useState(null);
  useEffect(() => {
    getGameId({ token }, id => setGameTableId(id));
  }, [getGameId, token]);

  useEffect(() => {
    if (joinGameSuccess) {
      getProfile();
      close();
    }
  }, [joinGameSuccess, getProfile, close]);

  useEffect(() => {
    return () => {
      joinGameError && resetGameError();
    };
  }, [joinGameError, resetGameError]);

  let gameDetails = {};
  const entries = location.search.substring(1).split('&');

  entries.forEach(entry => {
    const [key, value] = entry.split('=');
    gameDetails[key] = value;
  });

  const { tableTitle, minStakeAmount } = gameDetails;

  return (
    <div className={modal}>
      <div>
        <div className={modalBackdrop} onClick={close} />
        <div className={modalContent}>
          <div className={cx(privateGameSummary, { [loading]: !gameTableId })}>
            <CircleNaira />
            <h4>{decodeURIComponent(tableTitle)}</h4>
            <h5>Private Game</h5>
            <p>
              This game has a stake amount of{' '}
              <b>₦{minStakeAmount.toLocaleString()}.</b> <br />
              <b>Please confirm to join.</b>
            </p>

            <div className={joinActions}>
              <span onClick={close}>CANCEL</span>
              <Button
                theme="secondary"
                disabled={!gameTableId || gameLoading}
                onClick={() => joinGame({ gameTableId })}
              >
                JOIN GAME
              </Button>
            </div>
          </div>
        </div>
        {joinGameError && (
          <Toast type="error" message={joinGameError} close={resetGameError} />
        )}
      </div>
    </div>
  );
};

JoinPrivateGameModal.propTypes = {
  close: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  location: PropTypes.object
};

export default UserConsumer(GamesConsumer(JoinPrivateGameModal));
