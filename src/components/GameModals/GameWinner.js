import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { LinkButton } from '../../components/Button';
import RadialTrophyIcon from '../../vectors/RadialTrophyIcon';
import RedChevronRightIcon from '../../vectors/RedChevronRightIcon';
import OpponentsCards from './OpponentsCards';
import {
  modal,
  content,
  winningContainer,
  winning,
  opponentCardsLink,
  modalNote,
  linkBtn,
  exitBtn
} from './GameModals.module.sass';

const GameWinner = ({ player, amount, opponents }) => {
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
          <div className={winningContainer}>
            <RadialTrophyIcon />
            <h2>Congratulations {player}!</h2>
            <h4>
              You Won{' '}
              <span className={winning}>₦{amount.toLocaleString()}</span>
            </h4>
            <div className={opponentCardsLink}>
              <span onClick={() => setShowOpponents(true)}>
                See opponents cards <RedChevronRightIcon />
              </span>
            </div>
            <p className={modalNote}>
              Do you want to play <br /> another round?
            </p>
            <LinkButton to="/daily-games" className={linkBtn} theme="secondary">
              GO TO DAILY GAMES
            </LinkButton>
            <Link to="/" className={exitBtn}>
              LEAVE
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

GameWinner.defaultProps = {
  amount: 0
};

GameWinner.propTypes = {
  player: PropTypes.string.isRequired,
  opponents: PropTypes.array.isRequired,
  amount: PropTypes.number
};

export default GameWinner;
