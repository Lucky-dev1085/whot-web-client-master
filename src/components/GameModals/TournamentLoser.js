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
  losingContainer,
  opponentCardsLink,
  linkBtn,
  exitBtn
} from './GameModals.module.sass';

const TournamentLoser = ({ opponents }) => {
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
            <RadialTrophyIcon />
            <h2>Thanks for participating</h2>
            <h4>
              You lost this round and have
              <br />
              dropped out of the tournament
            </h4>
            <div className={opponentCardsLink}>
              <span onClick={() => setShowOpponents(true)}>
                See players cards <RedChevronRightIcon />
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

TournamentLoser.propTypes = {
  opponents: PropTypes.array.isRequired
};

export default TournamentLoser;
