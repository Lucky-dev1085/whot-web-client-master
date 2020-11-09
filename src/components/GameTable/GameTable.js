import React, { Component, createRef } from 'react';
import cx from 'classnames';
import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

import {
  container,
  table,
  stakeAmount,
  playerTurn,
  currentPlayer,
  offlineOverlay
} from './GameTable.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import { GamesConsumer } from '../../contexts/GamesContext';
import Market from './Market';
import CurrentBoard from './CurrentBoard';
import UserCards from './UserCards';
import OpponentsCards from './OpponentsCards';
import Messaging from './Messaging';
import {
  GameWinner,
  GameLoser,
  TournamentWinner,
  TournamentGameWinner,
  TournamentLoser
} from '../GameModals';
import WalletIcon from '../../vectors/WalletIcon';
import { isMobile } from '../../utils';

class GameTable extends Component {
  state = {
    userCards: [],
    currentBoardCards: [],
    marketTotal: 0,
    opponents: [],
    messages: [],
    tableWidth: 0,
    tableHeight: 0
  };

  tableRef = createRef(null);

  getTableDimensions = () => {
    const tableWidth = this.table.clientWidth;
    const tableHeight = this.table.clientHeight;

    this.setState({ tableWidth, tableHeight });
  };

  addToCurrentBoard = index => {
    const { makeMove, match } = this.props;
    const { userCards, currentBoardCards } = this.state;
    const card = userCards[index];
    userCards.splice(index, 1);

    this.setState({
      currentBoardCards: [...currentBoardCards, card]
    });

    makeMove({
      gameTableId: match.params.id,
      playCard: card.index
    });
  };

  gotoMarket = () => {
    const { makeMove, match } = this.props;

    this.setState({ userGotoMarket: true });
    makeMove({
      gameTableId: match.params.id,
      gotoMarket: true
    });
  };

  setUpConnection = async () => {
    const {
      match,
      getGameStatus,
      getMessages,
      deleteGamePlaySequence
    } = this.props;
    const gameId = match.params.id;
    await getMessages(this.updateMessages);
    getGameStatus(gameId, data => {
      const updateGameState = this.updateGameState;
      const updateMessages = this.updateMessages;
      updateGameState(data);
      const {
        socketioUrl,
        gamePlayService,
        tokenAuthService,
        transports
      } = data.realtimeConnection;
      const socket = io(socketioUrl, { transports });
      const client = feathers();
      client.configure(socketio(socket));
      const wsAuth = client.service(tokenAuthService);
      const jwt = window.localStorage.getItem('jwt');
      socket.on('connect', () => {
        const { gamePlaySequence } = this.state;
        wsAuth
          .create({ jwt })
          .then(() => {})
          .catch(error => console.log(error));
        gamePlaySequence &&
          getGameStatus(gameId, data => updateGameState(data, socket));
        getMessages(data => updateMessages(data, true));
      });
      const gameService = client.service(gamePlayService);
      gameService.on('created', data => {
        updateGameState(data, socket);
        deleteGamePlaySequence(gameId, data.gamePlaySequence);
      });
      const chatService = client.service('chat-messages');
      chatService.on('created', data => {
        updateMessages([data]);
      });
      socket.on('disconnect', reason => {
        if (reason === 'io server disconnect') {
          socket.connect();
        }
        console.log(reason);
        // else the socket will automatically try to reconnect
      });
    });
  };

  updateGameState = (data, socket) => {
    console.log(data);
    const { user } = this.props;
    const { userGotoMarket } = this.state;
    const {
      status,
      gameType,
      tournament,
      deck,
      playedDeck,
      players,
      nextPlayer,
      gamePlaySequence,
      tableDeckCount,
      upCard,
      play = {},
      winners = []
    } = data;

    this.setState({
      tournament,
      winners,
      currentSocket: socket
    });

    if (socket && status === 'ended' && gameType !== 'TOURNAMENT') {
      setTimeout(() => socket.disconnect(), 60000);
    }

    if (
      status === 'notStarted' ||
      gamePlaySequence <= this.state.gamePlaySequence
    ) {
      return;
    }

    const userName = user.name;
    const { player, gotoMarket } = play;
    const opponentMove = play && player && player !== userName;
    const opponentPlayed = opponentMove && !gotoMarket;
    const opponentGotoMarket = opponentMove && gotoMarket && player;
    const userCards = deck.map((card, index) => ({ ...card, index })).reverse();
    const userIndex = players.findIndex(({ name }) => name === userName);
    const opponents = [
      ...players.slice(userIndex + 1),
      ...players.slice(0, userIndex)
    ];

    if (userGotoMarket && gotoMarket && player === userName) {
      this.setState({ marketFlipCard: deck[deck.length - 1] });
      setTimeout(() => {
        this.setState({
          userGotoMarket: false,
          marketTotal: tableDeckCount,
          marketFlipCard: null
        });
      }, 550);
      setTimeout(() => {
        this.setState({ userCards });
      }, 600);
    }

    if (opponentGotoMarket) {
      this.setState({ opponentGotoMarket });
      setTimeout(() => {
        this.setState({
          opponentGotoMarket: null,
          marketTotal: tableDeckCount
        });
      }, 550);
      setTimeout(() => {
        this.setState({ opponents });
      }, 600);
    }

    if (opponentPlayed) {
      const opponentPlay = {
        player,
        card: upCard
      };

      this.setState({ opponentPlay });
      setTimeout(() => {
        this.setState({
          opponents,
          opponentPlay: null,
          currentBoardCards: playedDeck.length ? playedDeck : [upCard]
        });
      }, 1600);
    }

    const justEnded = this.state.status === 'live' && status === 'ended';

    if (justEnded) {
      setTimeout(() => this.setState({ status }), 10000);
    }

    this.setState({
      gameType,
      upCard,
      players,
      nextPlayer,
      gamePlaySequence,
      status: justEnded ? this.state.status : status,
      opponents:
        opponentPlayed || opponentGotoMarket ? this.state.opponents : opponents,
      userCards: this.state.userGotoMarket ? this.state.userCards : userCards,
      marketTotal:
        this.state.userGotoMarket || opponentGotoMarket
          ? this.state.marketTotal
          : tableDeckCount,
      currentBoardCards: opponentPlayed
        ? this.state.currentBoardCards
        : playedDeck.length
        ? playedDeck
        : [upCard]
    });
  };

  updateMessages = (data, refresh) => {
    if (refresh) {
      return this.setState({ messages: data });
    }
    const { messages } = this.state;
    const newMessages = [...messages, ...data];
    this.setState({ messages: newMessages });
  };

  getWinning = () => {
    const { match, getGame } = this.props;
    getGame(match.params.id, ({ maxPlayerCount, minStakeAmount }) => {
      this.setState({ winning: maxPlayerCount * minStakeAmount });
    });
  };

  resetTable = () => {
    this.setState({
      userCards: [],
      currentBoardCards: [],
      marketTotal: 0,
      opponents: [],
      messages: [],
      status: 'notStarted',
      gamePlaySequence: 0
    });
    this.getWinning();
  };

  onOffline = () => {
    this.setState({ isOffline: true });
  };

  onOnline = () => {
    const { getGameStatus, match } = this.props;

    this.setState({ isOffline: false });
    getGameStatus(match.params.id, data => this.updateGameState(data));
  };

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    const { currentSocket } = this.state;

    if (match.params.id !== prevProps.match.params.id) {
      this.resetTable();
      currentSocket && currentSocket.disconnect();
      this.setUpConnection();
    }
  }

  componentDidMount() {
    this.table = this.tableRef.current;
    this.getWinning();
    this.getTableDimensions();
    this.setUpConnection();

    window.addEventListener('offline', this.onOffline);
    window.addEventListener('online', this.onOnline);
  }

  componentWillUnmount() {
    const { currentSocket } = this.state;

    currentSocket && currentSocket.disconnect();
    window.removeEventListener('offline', this.onOffline);
    window.removeEventListener('online', this.onOnline);
  }

  render = () => {
    const { user, sendingMove, sendMessage, sendingMessage } = this.props;
    const {
      userCards,
      currentBoardCards,
      opponents,
      upCard,
      nextPlayer,
      players,
      marketFlipCard,
      marketTotal,
      opponentPlay,
      opponentGotoMarket,
      userGotoMarket,
      messages,
      tableWidth,
      tableHeight,
      gameType,
      tournament,
      winning,
      winners,
      status,
      isOffline
    } = this.state;
    const userName = user.name;
    const isTurn = nextPlayer === userName;
    const cardWidth = tableWidth * 0.136;
    const cardHeight = tableHeight * 0.365;
    const gameEnded = status === 'ended';
    const isTournament = gameType === 'TOURNAMENT';
    const isTournamentFinal =
      isTournament &&
      tournament.tournamentStage === 'FINAL' &&
      players.length === 2;
    const isWinner = gameEnded && winners.includes(userName);
    const isLoser = gameEnded && !winners.includes(userName);
    const tableStyle = {
      width: !isMobile() && 745,
      height: !isMobile() && 410
    };
    const nextPlayerSuffix =
      nextPlayer && nextPlayer.endsWith('s') ? "'" : "'s";

    return (
      <section className={container}>
        <div className={table} ref={this.tableRef} style={tableStyle}>
          <Messaging
            messages={messages}
            s
            sendMessage={sendMessage}
            sendingMessage={sendingMessage}
            player={userName}
          />
          {Boolean(winning) && (
            <div className={stakeAmount}>
              <WalletIcon />
              <span>₦{winning.toLocaleString()}</span>
            </div>
          )}
          <Market
            isTurn={isTurn}
            marketFlipCard={marketFlipCard}
            opponents={opponents}
            opponentGotoMarket={opponentGotoMarket}
            gotoMarket={this.gotoMarket}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            total={marketTotal}
            sendingMove={sendingMove}
          />
          <CurrentBoard
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            cards={currentBoardCards}
          />
          <UserCards
            upCard={upCard}
            isTurn={isTurn}
            userGotoMarket={userGotoMarket}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            cards={userCards}
            addToCurrentBoard={this.addToCurrentBoard}
            sendingMove={sendingMove}
          />
          {opponents.map(({ name, cardCount }, index) => (
            <OpponentsCards
              key={index}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              total={cardCount}
              totalOpponents={opponents.length}
              opponentNumber={index + 1}
              opponentPlay={opponentPlay}
              opponentGotoMarket={opponentGotoMarket}
              name={name}
            />
          ))}
          {opponents.length > 0 && status === 'live' && (
            <div className={cx(playerTurn, { [currentPlayer]: isTurn })}>
              {isTurn ? 'Your' : `${nextPlayer}${nextPlayerSuffix}`} Turn
            </div>
          )}
          {isWinner && !isTournament && (
            <GameWinner
              amount={winning}
              player={userName}
              opponents={opponents}
            />
          )}
          {!isTournament && isLoser && (
            <GameLoser winner={winners[0]} opponents={opponents} />
          )}
          {isWinner && isTournament && isTournamentFinal && (
            <TournamentWinner
              tournamentTitle={tournament.tournamentTitle}
              player={userName}
              opponents={opponents}
            />
          )}
          {isWinner && isTournament && !isTournamentFinal && (
            <TournamentGameWinner
              tournamentTitle={tournament.tournamentTitle}
              player={userName}
              opponents={opponents}
              pendingGames={tournament.currentRoundLiveTableCount}
            />
          )}
          {isTournament && isLoser && <TournamentLoser opponents={opponents} />}
          {isOffline && <div className={offlineOverlay} />}
        </div>
      </section>
    );
  };
}

export default UserConsumer(GamesConsumer(GameTable));
