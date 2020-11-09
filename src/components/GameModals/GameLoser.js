import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { LinkButton } from '../../components/Button';
import RadialNaira from '../../vectors/RadialNaira';
import RedChevronRightIcon from '../../vectors/RedChevronRightIcon';
import OpponentsCards from './OpponentsCards';
import {
  modal,
  content,
  losingContainer,
  opponentCardsLink,
  modalNote,
  linkBtn,
  exitBtn
} from './GameModals.module.sass';

const GameLoser = ({ winner, opponents }) => {
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
          <div className={losingContainer}>
            <RadialNaira />
            <h2>Thanks for Playing</h2>
            <h4>
              {winner} won the game.
              <br />
              Better luck next time!
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

GameLoser.propTypes = {
  winner: PropTypes.string.isRequired,
  opponents: PropTypes.array.isRequired
};

export default GameLoser;
