import React from 'react';
import PropTypes from 'prop-types';

import RadialStarIcon from '../../vectors/RadialStarIcon';
import {
  modal,
  content,
  countdownContainer,
  gameTitle,
  countdown,
  countdownValue,
  countdownSecond,
  countdownSecondValues
} from './GameModals.module.sass';
import RadialProgress from '../../vectors/RadialProgress';

const GameCountdown = ({ title, isPrivate }) => {
  return (
    <div className={modal}>
      <div className={content}>
        <div className={countdownContainer}>
          <RadialStarIcon />
          <h4>
            The {isPrivate && 'private'} game{' '}
            <span className={gameTitle}>{title}</span> will start in
          </h4>

          <div className={countdown}>
            <RadialProgress />
            <div className={countdownValue}>
              <span>
                00:
                <span className={countdownSecond}>
                  <span className={countdownSecondValues}>
                    <span>05</span>
                    <span>04</span>
                    <span>03</span>
                    <span>02</span>
                    <span>01</span>
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GameCountdown.propTypes = {
  title: PropTypes.string.isRequired
};

export default GameCountdown;
