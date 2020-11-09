import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { currentBoard, card } from './GameTable.module.sass';
import cardsMaterials from './cardsMaterials';

const CurrentBoard = ({ cards, cardWidth, cardHeight }) => {
  const cardPositions = Array(46)
    .fill(0)
    .map(() => {
      const posX = Math.floor(Math.random() * 11);
      const posY = Math.floor(Math.random() * 5);
      const rotate = Math.floor(Math.random() * 7) - 3;

      return `translate3d(${posX}px, ${posY}px, 0) rotate(${rotate}deg)`;
    });
  const [cardsTransform] = useState(cardPositions);

  return (
    <div
      className={currentBoard}
      style={{ transform: `translateX(${-cardWidth}px)` }}
    >
      {cards.map(({ suit, rank }, index) => {
        const style = {
          width: cardWidth,
          height: cardHeight,
          transform: cardsTransform[index]
        };
        const Shape = cardsMaterials[suit][rank];

        return (
          <span
            key={`${suit}-${rank}`}
            data-current-board-card={index === cards.length - 1}
            className={card}
            style={style}
          >
            {Shape && <Shape />}
          </span>
        );
      })}
    </div>
  );
};

CurrentBoard.defaultProps = {
  cards: [],
  cardWidth: 0,
  cardHeight: 0
};

CurrentBoard.propTypes = {
  cards: PropTypes.array,
  cardWidth: PropTypes.number,
  tableHeight: PropTypes.number
};

export default CurrentBoard;
