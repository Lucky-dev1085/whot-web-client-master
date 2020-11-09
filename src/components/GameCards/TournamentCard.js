import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';

import {
  tournamentCard,
  featuredTournamentCard,
  gameSummary,
  title,
  tournamentPrice,
  gameDetails,
  pillValue
} from './GameCards.module.sass';
import Button from '../Button';
import TrophyIcon from '../../vectors/TrophyIcon';
import CirclePurse from '../../vectors/CirclePurse';
import CircleClock from '../../vectors/CircleClock';
import CirclePlayers from '../../vectors/CirclePlayers';

const TournamentCard = ({
  featuredCard,
  tournamentTitle,
  prizeAmount,
  stakeAmount,
  startingAt,
  playerCount,
  maxPlayerCount,
  gameIndex,
  openJoinModal
}) => (
  <div
    className={cx(tournamentCard, { [featuredTournamentCard]: featuredCard })}
  >
    <div className={gameSummary}>
      <h4 className={title}>{tournamentTitle}</h4>
      <span className={tournamentPrice}>
        <TrophyIcon /> ₦{prizeAmount.toLocaleString()}
      </span>
    </div>
    <div className={gameDetails}>
      <div>
        <CirclePurse background="#F1B77D" />{' '}
        <span className={pillValue}>₦{stakeAmount.toLocaleString()}</span>
      </div>
      <div>
        <CircleClock />{' '}
        <span className={pillValue}>{moment(startingAt).format('h:mm A')}</span>
      </div>
      {!featuredCard && (
        <div>
          <CirclePlayers background="#F1B77D" />{' '}
          <span className={pillValue}>
            {playerCount}/{maxPlayerCount}
          </span>
        </div>
      )}
      <div>
        <Button
          theme="secondary"
          size="xs"
          onClick={() => openJoinModal(gameIndex)}
        >
          JOIN
        </Button>
      </div>
    </div>
  </div>
);

TournamentCard.propTypes = {
  featuredCard: PropTypes.bool,
  gameIndex: PropTypes.number.isRequired,
  openJoinModal: PropTypes.func.isRequired
};

export default TournamentCard;
