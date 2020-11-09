import React, { Component } from 'react';

import {
  games,
  joinGame,
  tournaments,
  joinTournament,
  gameInvitation,
  gamePlay,
  playerGames,
  chatMessages
} from './resources';
import { getRequestError } from '../../utils/requests';

const GamesContext = React.createContext();
class GamesProvider extends Component {
  state = {
    featuredTournaments: []
  };

  createGame = (data, onSuccess) => {
    this.resetGameError();
    this.setState({ gameLoading: true });

    games
      .post(data, true)
      .then(({ data }) => {
        this.setState({
          gameLoading: false
        });

        onSuccess && onSuccess(data);
      })
      .catch(error => {
        this.setState({
          gameError: getRequestError(error),
          gameLoading: false
        });
      });
  };

  updateGame = (id, data) => {
    this.resetGameError();
    this.resetGameSuccess();
    this.setState({ gameLoading: true });

    games
      .patchById(id, data)
      .then(() => {
        this.setState({
          gameSuccess: true,
          gameLoading: false
        });
      })
      .catch(error => {
        this.setState({
          gameError: getRequestError(error),
          gameLoading: false
        });
      });
  };

  getGame = (id, callback) => {
    games
      .getById(id)
      .then(({ data }) => {
        this.setState({ gameLoading: false }, () => callback(data));
      })
      .catch(error => {
        this.setState({
          gameError: getRequestError(error),
          gameLoading: false
        });
      });
  };

  deleteGame = id => {
    this.resetGameError();
    this.resetGameSuccess();
    this.setState({ gameLoading: true });

    games
      .deleteById(id)
      .then(() => {
        this.setState({
          deleteGameSuccess: true,
          gameLoading: false
        });
      })
      .catch(error => {});
  };

  joinGame = data => {
    this.resetGameError();
    this.resetGameSuccess();
    this.setState({ gameLoading: true });

    joinGame
      .post(data, true)
      .then(() => {
        this.setState({
          joinGameSuccess: true,
          gameLoading: false
        });
      })
      .catch(error => {
        this.setState({
          joinGameError: getRequestError(error),
          gameLoading: false
        });
      });
  };

  joinTournament = data => {
    this.resetGameError();
    this.resetGameSuccess();
    this.setState({ gameLoading: true });

    joinTournament
      .post(data, true)
      .then(() => {
        this.setState({
          joinGameSuccess: true,
          gameLoading: false
        });
      })
      .catch(error => {
        this.setState({
          joinGameError: getRequestError(error),
          gameLoading: false
        });
      });
  };

  sendGameInvites = data => {
    this.resetGameError();
    this.resetGameSuccess();
    this.setState({ gameLoading: true });

    gameInvitation
      .post(data, true)
      .then(() => {
        this.setState({
          gameInvitationSuccess: true,
          gameLoading: false
        });
      })
      .catch(error => {
        this.setState({
          gameInvitationError: getRequestError(error),
          gameLoading: false
        });
      });
  };

  getGameId = (params, callback) => {
    gameInvitation
      .get(params, true)
      .then(({ data }) => {
        callback(data.gameTableId);
      })
      .catch(error => {
        this.setState({
          joinGameError: getRequestError(error)
        });
      });
  };

  getGameStatus = (id, callback) => {
    gamePlay
      .getById(id)
      .then(({ data }) => {
        callback(data);
      })
      .catch(error => {});
  };

  getPlayerGames = callback => {
    playerGames
      .get({}, true)
      .then(({ data }) => {
        callback(data);
      })
      .catch(error => {});
  };

  makeMove = data => {
    this.setState({ sendingMove: true });
    gamePlay
      .post(data, true)
      .then(() => this.setState({ sendingMove: false }))
      .catch(error => {});
  };

  deleteGamePlaySequence = (id, gamePlaySequence) => {
    gamePlay
      .deleteById(id, { gamePlaySequence })
      .then(() => {})
      .catch(error => {});
  };

  getMessages = callback => {
    return chatMessages
      .get({}, true)
      .then(({ data }) => {
        callback(data.data);
      })
      .catch(error => {});
  };

  sendMessage = (text, callback) => {
    this.setState({ sendingMessage: true });
    const data = {
      text,
      type: 'room-messages',
      senderName: '',
      contentUrl: '',
      contentType: ''
    };
    chatMessages
      .post(data, true)
      .then(() => {
        this.setState({ sendingMessage: false });
        callback();
      })
      .catch(error => {});
  };

  resetGameSuccess = () => {
    this.setState({
      gameSuccess: false,
      deleteGameSuccess: false,
      joinGameSuccess: false,
      gameInvitationSuccess: false
    });
  };

  resetGameError = () => {
    this.setState({
      gameError: null,
      joinGameError: null,
      gameInvitationError: null
    });
  };

  getFeaturedTournaments = () => {
    this.setState({ loadingFeaturedTournaments: true });

    const queryParams = {
      $order: '-featured',
      $offset: 0,
      $limit: 1000,
      featured: true,
      state: 'PENDING'
    };

    tournaments
      .get(queryParams, true)
      .then(({ data }) => {
        this.setState({
          loadingFeaturedTournaments: false,
          featuredTournaments: data.data
        });
      })
      .catch(error => {
        this.setState({
          loadingFeaturedTournaments: false
        });
      });
  };

  render() {
    return (
      <GamesContext.Provider
        value={{
          ...this.state,
          getFeaturedTournaments: this.getFeaturedTournaments,
          resetGameSuccess: this.resetGameSuccess,
          createGame: this.createGame,
          updateGame: this.updateGame,
          getGame: this.getGame,
          deleteGame: this.deleteGame,
          joinGame: this.joinGame,
          joinTournament: this.joinTournament,
          sendGameInvites: this.sendGameInvites,
          getGameId: this.getGameId,
          getGameStatus: this.getGameStatus,
          getPlayerGames: this.getPlayerGames,
          makeMove: this.makeMove,
          getMessages: this.getMessages,
          sendMessage: this.sendMessage,
          deleteGamePlaySequence: this.deleteGamePlaySequence,
          resetGameError: this.resetGameError
        }}
      >
        {this.props.children}
      </GamesContext.Provider>
    );
  }
}

const GamesConsumer = Component => {
  return class Consumer extends React.Component {
    render() {
      return (
        <GamesContext.Consumer>
          {data => <Component {...this.props} {...data} />}
        </GamesContext.Consumer>
      );
    }
  };
};

export default GamesContext;
export { GamesProvider, GamesConsumer };
