import React from 'react';
import PropTypes from 'prop-types';

import {
  dailyGameCard,
  title,
  gameDetails,
  pillValue
} from './GameCards.module.sass';
import Button from '../Button';
import FeaturedIcon from '../../vectors/FeaturedIcon';
import CirclePurse from '../../vectors/CirclePurse';
import CirclePlayers from '../../vectors/CirclePlayers';
import CircleTrophy from '../../vectors/CircleTrophy';

const DailyGameCard = ({
  tableTitle,
  featured,
  minStakeAmount,
  playerCount,
  maxPlayerCount,
  gameIndex,
  openJoinModal
}) => (
  <div className={dailyGameCard}>
    <h4 className={title}>
      {tableTitle} {featured && <FeaturedIcon />}
    </h4>
    <div className={gameDetails}>
      <div>
        <CirclePurse />{' '}
        <span className={pillValue}>₦{minStakeAmount.toLocaleString()}</span>
      </div>
      <div>
        <CirclePlayers />{' '}
        <span className={pillValue}>
          {playerCount}/{maxPlayerCount}
        </span>
      </div>
      <div>
        <CircleTrophy />{' '}
        <span className={pillValue}>
          ₦{(minStakeAmount * playerCount).toLocaleString()}
        </span>
      </div>
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

DailyGameCard.propTypes = {
  gameIndex: PropTypes.number.isRequired,
  openJoinModal: PropTypes.func.isRequired
};

export default DailyGameCard;
