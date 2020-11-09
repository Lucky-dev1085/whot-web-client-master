import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  opponentsContainer,
  opponentsHeader,
  opponentsCarouselControls,
  disableControl,
  hiddenControl,
  opponentsNames,
  cardsArea,
  opponentCards,
  opponentsFooter
} from './GameModals.module.sass';
import cardsMaterials from '../GameTable/cardsMaterials';
import RadialStarIcon from '../../vectors/RadialStarIcon';
import ChevronLeftIcon from '../../vectors/ChevronLeftIcon';
import ChevronRightIcon from '../../vectors/ChevronRightIcon';

const OpponentsCards = ({ opponents, close }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const opponentsLength = opponents.length;
  const hideControls = opponentsLength === 1;

  return (
    <div className={opponentsContainer}>
      <div className={opponentsHeader}>
        <RadialStarIcon />
        <div className={opponentsCarouselControls}>
          <span
            className={cx({
              [disableControl]: activeIndex === 0,
              [hiddenControl]: hideControls
            })}
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            {' '}
            <ChevronLeftIcon />{' '}
          </span>
          <div className={opponentsNames}>
            <div
              style={{
                width: `${opponentsLength * 100}%`,
                transform: `translate3d(-${activeIndex *
                  (100 / opponentsLength)}%, 0, 0)`
              }}
            >
              {opponents.map(({ name }, index) => (
                <h4 key={index}>
                  {name}'{!name.endsWith('s') && 's'} card
                </h4>
              ))}
            </div>
          </div>
          <span
            className={cx({
              [disableControl]: activeIndex === opponentsLength - 1,
              [hiddenControl]: hideControls
            })}
            onClick={() => setActiveIndex(activeIndex + 1)}
          >
            {' '}
            <ChevronRightIcon />{' '}
          </span>
        </div>
      </div>
      <div className={cardsArea}>
        <div
          style={{
            width: `${opponentsLength * 100}%`,
            transform: `translate3d(-${activeIndex *
              (100 / opponentsLength)}%, 0, 0)`
          }}
        >
          {opponents.map(({ deck }, index) => (
            <div key={index} className={opponentCards}>
              {!deck.length && <div>No cards</div>}
              {deck.map(({ suit, rank }, index) => {
                const Shape = cardsMaterials[suit][rank];
                return (
                  <span key={index}>
                    {' '}
                    <Shape />{' '}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className={opponentsFooter}>
        <span onClick={close}>GO BACK</span>
      </div>
    </div>
  );
};

OpponentsCards.propTypes = {
  opponents: PropTypes.array.isRequired,
  close: PropTypes.func.isRequired
};

export default OpponentsCards;
