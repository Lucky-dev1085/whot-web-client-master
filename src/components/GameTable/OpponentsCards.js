import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import equals from 'shallow-equals';

import styles from './GameTable.module.sass';
import cardsMaterials from './cardsMaterials';
import {
  OPPONENTS_CARDS_TRANFORM as cardsTransform,
  OPPONENTS_AREA_CLASSNAMES as opponentsAreaClassnames,
  OPPONENTS_AREA_ROTATE as opponentsAreaRotate,
  OPPONENTS_CARDS_TO_CURRENT_BOARD as opponentsCardToCurrentBoard
} from './GameTable.constant';
import PlayerIcon from '../../vectors/PlayerIcon';

class OpponentsCards extends Component {
  state = {};

  componentDidUpdate(prevProps) {
    const { opponentPlay, opponentGotoMarket, name } = this.props;
    if (opponentPlay && !equals(opponentPlay, prevProps.opponentPlay)) {
      const isCurrentOpponent = opponentPlay.player === name;
      isCurrentOpponent && this.sendToCurrentBoard();
    }
    if (prevProps.opponentGotoMarket && !opponentGotoMarket) {
      const isCurrentOpponent = prevProps.opponentGotoMarket === name;
      isCurrentOpponent && this.animateNewCardIn();
    }
  }

  animateNewCardIn = () => {
    this.setState({ newCardIn: true });
    setTimeout(() => this.setState({ newCardIn: false }), 500);
  };

  sendToCurrentBoard = () => {
    const { opponentNumber, totalOpponents, total } = this.props;
    const playableCard = document.querySelector('[data-playable-card=true]');
    const opponentKey = `${opponentNumber}-${totalOpponents}`;

    setTimeout(() => {
      playableCard.style.transform =
        opponentsCardToCurrentBoard[opponentKey][Math.min(total, 5)];
    }, 1000);
  };

  render() {
    const {
      name,
      total,
      cardWidth,
      cardHeight,
      opponentNumber,
      totalOpponents,
      opponentPlay
    } = this.props;
    const { newCardIn } = this.state;

    const areaKey = `${opponentNumber}-${totalOpponents}`;
    const isHorizontalSide =
      areaKey === '1-3' ||
      areaKey === '1-4' ||
      areaKey === '3-3' ||
      areaKey === '4-4';
    const areaWidth = cardWidth * 3;
    const areaStyle = {
      width: areaWidth,
      height: isHorizontalSide ? null : cardHeight,
      bottom: isHorizontalSide ? null : -cardHeight,
      transform: `translate3d(-50%, ${-cardHeight * 0.5}px, 0) ${
        opponentsAreaRotate[areaKey]
      }`
    };

    const areaClassname = opponentsAreaClassnames[areaKey];
    const cards = Array(Math.min(total, 6)).fill(0);
    const Back = cardsMaterials.back;

    return (
      <>
        <div
          className={cx(styles.opponentsCards, styles[areaClassname])}
          style={areaStyle}
        >
          {cards.map((item, index) => {
            const styleIndex = newCardIn ? index - 1 : index;
            const cardsTotal = newCardIn ? total - 1 : total;

            const style = {
              width: cardWidth,
              height: cardHeight,
              left: cardWidth * styleIndex * 0.5,
              transform:
                styleIndex < 5
                  ? styleIndex === -1
                    ? 'translate3d(65%, -13%, 0) rotate(0deg)'
                    : cardsTransform[Math.min(cardsTotal, 5)][styleIndex]
                  : cardsTransform[0]
            };

            const { suit, rank } = opponentPlay ? opponentPlay.card : {};
            const playableCard =
              opponentPlay &&
              opponentPlay.player === name &&
              index === Math.min(total - 1, 4);
            const Shape =
              playableCard && opponentPlay && cardsMaterials[suit][rank];
            const key = Shape ? `${suit}-${rank}` : `${index}`;

            return (
              <span key={key} className={styles.card} style={style}>
                <span
                  data-playable-card={playableCard}
                  className={styles.flippable}
                >
                  <span className={styles.cardFront}>{Shape && <Shape />}</span>
                  <span className={styles.cardBack}>
                    <Back />
                  </span>
                </span>
              </span>
            );
          })}
        </div>
        <div
          className={cx(
            styles.opponentName,
            styles[`${areaClassname}OpponentName`]
          )}
        >
          <span>
            <PlayerIcon /> {name}
          </span>
        </div>
      </>
    );
  }
}

OpponentsCards.defaultProps = {
  total: 0,
  cardWidth: 0,
  cardHeight: 0
};

OpponentsCards.propTypes = {
  total: PropTypes.number,
  cardWidth: PropTypes.number,
  tableHeight: PropTypes.number,
  totalOpponents: PropTypes.number.isRequired,
  opponentNumber: PropTypes.number.isRequired
};

export default OpponentsCards;
