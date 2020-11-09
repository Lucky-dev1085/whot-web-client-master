import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import RadialTrophyIcon from '../../vectors/RadialTrophyIcon';
import RedChevronRightIcon from '../../vectors/RedChevronRightIcon';
import OpponentsCards from './OpponentsCards';
import {
  modal,
  content,
  winningContainer,
  tournamentWinningContainer,
  winning,
  opponentCardsLink,
  modalNote
} from './GameModals.module.sass';

const TournamentGameWinner = ({
  tournamentTitle,
  player,
  opponents,
  pendingGames
}) => {
  const [showOpponents, setShowOpponents] = useState(false);

  return (
    <div className={modal}>
      <div className={content}>
        {showOpponents ? (
          <OpponentsCards
            opponents={opponents}
            close={() => setShowOpponents(false)}
          />
        ) : (
          <div className={cx(winningContainer, tournamentWinningContainer)}>
            <RadialTrophyIcon />
            <h2>Congratulations {player}!</h2>
            <h4>
              You have qualified to the next round of <br />
              <span className={winning}>{tournamentTitle}</span> <br />
              Tournament
            </h4>
            <div className={opponentCardsLink}>
              <span onClick={() => setShowOpponents(true)}>
                See opponents cards <RedChevronRightIcon />
              </span>
            </div>
            <p className={modalNote}>
              You will be redirected to the next round in a bit.
              {pendingGames > 0 && (
                <>
                  {' '}
                  Waiting for {pendingGames} game{pendingGames > 1 && 's'} to
                  finish
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

TournamentGameWinner.propTypes = {
  tournamentTitle: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
  opponents: PropTypes.array.isRequired,
  pendingGames: PropTypes.number.isRequired
};

export default TournamentGameWinner;
