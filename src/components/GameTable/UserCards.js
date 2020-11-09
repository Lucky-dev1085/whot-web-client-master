import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import swipeListener from 'swipe-listener';

import {
  userCards,
  swipeNotif,
  card,
  moveToCurrentBoard,
  selected,
  canPlayCard
} from './GameTable.module.sass';
import cardsMaterials from './cardsMaterials';
import {
  USER_CARDS_TRANSFORM as cardsTransform,
  USER_CARDS_TO_CURRENT_TRANSFORM as cardsToCurrentTransform
} from './GameTable.constant';

class UserCards extends Component {
  state = {
    swipePos: 1
  };

  userCardArea = createRef(null);

  onCardClick = (index, canPlay) => {
    const { isTurn, sendingMove } = this.props;
    const { activeIndex, willSend } = this.state;

    if (!isTurn || willSend || sendingMove) {
      return;
    }

    const isSelectedCard = index === activeIndex;
    const willPlay = isSelectedCard && canPlay;
    willPlay && this.setState({ willSend: true });

    isSelectedCard
      ? canPlay && this.sendToCurrentBoard(index)
      : this.setState({ activeIndex: index });
  };

  sendToCurrentBoard = index => {
    const { addToCurrentBoard } = this.props;
    const activeCard = document.querySelector('[data-active-card=true]');
    const activeCardRect = activeCard.getBoundingClientRect();
    const currentBoardRect = document
      .querySelector('[data-current-board-card=true]')
      .getBoundingClientRect();
    const distanceX = activeCardRect.x - currentBoardRect.x;
    const distanceY = activeCardRect.y - currentBoardRect.y;

    activeCard.style.transform = `translate3d(${-distanceX}px, calc(${-distanceY}px - 20%), 0)`;
    this.setState({ toCurrentBoardIndex: index });

    setTimeout(() => {
      this.setState({
        activeIndex: null,
        toCurrentBoardIndex: null,
        willSend: false,
        swipePos: 1
      });
      addToCurrentBoard(index);
      activeCard.style.transform = null;
    }, 550);
  };

  animateNewCardIn = () => {
    this.setState({
      newCardIn: true,
      swipePos: 1
    });
    setTimeout(() => this.setState({ newCardIn: false }), 500);
  };

  onSwipe = ({ left, right }) => {
    const { cards } = this.props;
    const { swipePos } = this.state;
    const totalCards = cards.length;
    if (totalCards > 8 * swipePos && left) {
      this.setState({ swipePos: swipePos + 1 });
    }
    if (8 < 8 * swipePos && right) {
      this.setState({ swipePos: swipePos - 1 });
    }
  };

  componentDidUpdate(prevProps) {
    const { userGotoMarket } = this.props;

    if (prevProps.userGotoMarket && !userGotoMarket) {
      this.animateNewCardIn();
    }

    if (!prevProps.userGotoMarket && userGotoMarket) {
      this.setState({ activeIndex: null });
    }
  }

  componentDidMount() {
    const container = this.userCardArea.current;
    swipeListener(container);
    container.addEventListener('swipe', evt =>
      this.onSwipe(evt.detail.directions)
    );
  }

  render() {
    const { cards, upCard, isTurn, cardWidth, cardHeight } = this.props;
    const {
      newCardIn,
      toCurrentBoardIndex,
      activeIndex,
      swipePos
    } = this.state;

    const areaWidth = cardWidth * 3;
    const areaStyle = {
      width: areaWidth,
      height: cardHeight,
      bottom: -cardHeight,
      transform: `translate3d(-50%, ${-cardHeight * 0.7}px, 0)`
    };
    const extraCards = cards.length - 8;

    return (
      <div ref={this.userCardArea} className={userCards} style={areaStyle}>
        {cards.map(({ suit, rank }, index) => {
          const cardLength = newCardIn ? cards.length - 1 : cards.length;
          const hidden = cardLength - swipePos * 8;
          const revealCount =
            swipePos > 1 ? (hidden > 7 ? 8 : cardLength % 8) : 0;
          const swipeDifference =
            swipePos > 1 ? 8 * (swipePos - 2) + revealCount : 0;
          const cardIndex = newCardIn ? index - 1 : index;
          const styleIndex = cardIndex - swipeDifference;
          const isToCurrentBoard = toCurrentBoardIndex === index;
          const transform = isToCurrentBoard
            ? cardsToCurrentTransform
            : cardsTransform;
          const cardFitWidth = cardHeight * 0.64;
          const leftPosition =
            cardWidth * styleIndex * 0.5 + (cardWidth - cardFitWidth) / 2;
          const style = {
            width: cardFitWidth,
            height: cardHeight,
            left: leftPosition,
            transform:
              styleIndex < 8
                ? newCardIn && styleIndex === -1
                  ? 'translate3d(165%, 18%, 0px)'
                  : styleIndex >= 0
                  ? transform[Math.min(cardLength, 8)][styleIndex]
                  : transform[0]
                : transform[0]
          };
          const Shape = cardsMaterials[suit][rank];
          const isSelected = activeIndex === index;
          const canPlay =
            isTurn && (suit === upCard.suit || rank === upCard.rank);

          return (
            <span
              key={`${suit}-${rank}`}
              className={cx(card, { [moveToCurrentBoard]: isToCurrentBoard })}
              style={style}
              onClick={() => this.onCardClick(index, canPlay)}
            >
              <span
                data-active-card={isSelected}
                data-user-first-card={index === 0}
                className={cx({
                  [selected]: isSelected,
                  [canPlayCard]: canPlay
                })}
              >
                {Shape && <Shape />}
              </span>
            </span>
          );
        })}
        {extraCards > 0 && (
          <div className={swipeNotif}>
            <small>
              SWIPE - {extraCards} MORE CARD{extraCards > 1 && 'S'}
            </small>
          </div>
        )}
      </div>
    );
  }
}

UserCards.defaultProps = {
  cards: [],
  cardWidth: 0,
  cardHeight: 0
};

UserCards.propTypes = {
  cards: PropTypes.array,
  upCard: PropTypes.object,
  isTurn: PropTypes.bool,
  userGotoMarket: PropTypes.bool,
  cardWidth: PropTypes.number,
  tableHeight: PropTypes.number,
  addToCurrentBoard: PropTypes.func.isRequired
};

export default UserCards;
