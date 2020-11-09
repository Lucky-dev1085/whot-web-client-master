import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  market,
  marketActive,
  card,
  flippable,
  cardFront,
  cardBack
} from './GameTable.module.sass';
import cardsMaterials from './cardsMaterials';
import { MARKET_CARDS_TO_OPPONENT as marketCardsToOpponent } from './GameTable.constant';

const Market = ({
  isTurn,
  marketFlipCard,
  opponents,
  opponentGotoMarket,
  gotoMarket,
  total,
  cardWidth,
  cardHeight,
  sendingMove
}) => {
  const cardPositions = Array(46)
    .fill(0)
    .map(() => {
      const posX = Math.floor(Math.random() * 11);
      const posY = Math.floor(Math.random() * 5);
      const rotate = Math.floor(Math.random() * 7) - 3;

      return `translate3d(${posX}px, ${posY}px, 0) rotate(${rotate}deg)`;
    });
  const cards = Array(total).fill(0);
  const Back = cardsMaterials.back;
  const [cardsTransform] = useState(cardPositions);
  const canPick = isTurn && !sendingMove;

  useEffect(() => {
    const sendToUser = () => {
      const topCard = document.querySelector('[data-top-card=true]');
      topCard.style.transform = 'translate3d(200%, 150%, 0) rotateX(0deg)';
    };

    marketFlipCard && sendToUser();
  }, [marketFlipCard, cardHeight]);

  useEffect(() => {
    const sendToOpponent = () => {
      const topCard = document.querySelector('[data-top-card=true]');
      const opponentNumber =
        opponents.findIndex(({ name }) => name === opponentGotoMarket) + 1;
      const opponentKey = `${opponentNumber}-${opponents.length}`;
      topCard.style.transform = marketCardsToOpponent[opponentKey];
    };

    opponentGotoMarket && sendToOpponent();
  }, [opponentGotoMarket, opponents]);

  return (
    <div
      className={cx(market, { [marketActive]: canPick })}
      onClick={() => canPick && gotoMarket()}
    >
      {cards.map((item, index) => {
        const style = {
          width: cardWidth,
          height: cardHeight,
          transform: cardsTransform[index]
        };
        const topCard = index === cards.length - 1;
        const { suit, rank } = marketFlipCard || {};
        const Shape = topCard && marketFlipCard && cardsMaterials[suit][rank];

        return (
          <span key={index} className={card} style={style}>
            <span data-top-card={topCard} className={flippable}>
              <span className={cardFront}>{Shape && <Shape />}</span>
              <span className={cardBack}>
                <Back />
              </span>
            </span>
          </span>
        );
      })}
    </div>
  );
};

Market.defaultProps = {
  total: 0,
  cardWidth: 0,
  cardHeight: 0
};

Market.propTypes = {
  total: PropTypes.number,
  isTurn: PropTypes.bool,
  gotoMarket: PropTypes.func,
  marketFlipCard: PropTypes.object,
  opponents: PropTypes.array,
  opponentGotoMarket: PropTypes.string,
  cardWidth: PropTypes.number,
  tableHeight: PropTypes.number
};

export default Market;
