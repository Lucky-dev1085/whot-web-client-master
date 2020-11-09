import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import { LinkButton } from '../../components/Button';
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
  linkBtn,
  exitBtn
} from './GameModals.module.sass';

const TournamentWinner = ({ player, tournamentTitle, opponents }) => {
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
              You Won the <span className={winning}>{tournamentTitle}</span>{' '}
              Tournament
            </h4>
            <div className={opponentCardsLink}>
              <span onClick={() => setShowOpponents(true)}>
                See opponents cards <RedChevronRightIcon />
              </span>
            </div>
            <LinkButton to="/tournaments" className={linkBtn} theme="secondary">
              JOIN ANOTHER TOURNAMENT
            </LinkButton>
            <Link to="/" className={exitBtn}>
              GO HOME
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

TournamentWinner.propTypes = {
  tournamentTitle: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
  opponents: PropTypes.array.isRequired
};

export default TournamentWinner;
