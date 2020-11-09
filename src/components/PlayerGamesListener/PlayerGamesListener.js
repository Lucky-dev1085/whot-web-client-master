import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { UserConsumer } from '../../contexts/UserContext';
import { GamesConsumer } from '../../contexts/GamesContext';
import { GameCountdown } from '../GameModals';

const PlayerGamesListener = ({ user, getPlayerGames, makeMove }) => {
  const [nextGameTitle, setNextGameTitle] = useState(null);
  const [isNextPrivate, setIsNextPrivate] = useState(false);
  let history = useHistory();

  const setUpConnection = () => {
    if (!user) {
      return;
    }

    getPlayerGames(data => {
      onGameEvent(data.data);
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
        wsAuth
          .create({ jwt })
          .then(() => {})
          .catch(error => console.log(error));
        getPlayerGames(({ data }) => onGameEvent(data));
      });
      const gameService = client.service(gamePlayService);
      gameService.on('created', ({ data }) => {
        onGameEvent(data);
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

  const onGameEvent = data => {
    console.log(data);
    const nextGame = data.find(
      ({ gameTable }) =>
        moment(gameTable.startingAt).diff(moment(), 'seconds') < 60
    );
    if (nextGame) {
      const pathName = history.location.pathname;
      const isPlayRoute = pathName.startsWith('/play/');
      const { gameTable } = nextGame;
      const { tableTitle, id, gameType } = gameTable;
      const isGamePlayRoute = pathName.startsWith(`/play/${id}`);
      setNextGameTitle(isPlayRoute ? null : tableTitle);
      setIsNextPrivate(gameType === 'private');

      if (!isGamePlayRoute) {
        makeMove({ gameTableId: id });
        setTimeout(() => {
          history.push(`/play/${id}`);
          setNextGameTitle(null);
        }, 5000);
      }
    }
  };

  useEffect(setUpConnection, [user]);

  return (
    <>
      {nextGameTitle && (
        <GameCountdown title={nextGameTitle} isPrivate={isNextPrivate} />
      )}
    </>
  );
};

export default UserConsumer(GamesConsumer(PlayerGamesListener));
