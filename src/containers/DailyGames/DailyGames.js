import React, { Component } from 'react';
import { List } from 'react-virtualized';
import { Redirect } from 'react-router-dom';

import {
  container,
  gamesList,
  resultSummary,
  cardContainer,
  loadingMask
} from './DailyGames.module.sass';
import { GamesConsumer } from '../../contexts/GamesContext';
import { UserConsumer } from '../../contexts/UserContext';
import Header from '../../components/Header';
import { DailyGameCard, JoinDailyGameModal } from '../../components/GameCards';
import GameListFilters from '../../components/GameListFilters';
import { games } from './resources';

class DailyGames extends Component {
  state = {
    gamesData: [],
    stakeAmountQuery: {}
  };

  fetchData = () => {
    this.setState({ fetchingData: true });
    const { maxPlayerCount, stakeAmountQuery } = this.state;

    const queryParams = {
      $order: '-featured',
      $offset: 0,
      $limit: 1000,
      gameType: 'public',
      gameStatus: 'notStarted',
      ...stakeAmountQuery
    };

    if (maxPlayerCount) {
      queryParams.maxPlayerCount = maxPlayerCount;
    }

    games
      .get(queryParams, true)
      .then(resp => {
        const { data, total } = resp.data;

        this.setState({
          total,
          gamesData: data,
          fetchingData: false
        });
      })
      .catch(error => {
        this.setState({ fetchingData: false });
      });
  };

  onFiltersUpdate = filters => {
    this.setState(filters, this.fetchData);
  };

  openJoin = gameIndex => {
    this.setState({ openGameIndex: gameIndex });
  };

  closeJoin = () => {
    this.setState({ openGameIndex: null });
  };

  onResize = () => {
    this.setState({ resized: true });
  };

  componentDidUpdate(prevProps) {
    const { joinGameSuccess, resetGameSuccess, getProfile } = this.props;
    if (joinGameSuccess && !prevProps.joinGameSuccess) {
      resetGameSuccess();
      getProfile();
      this.setState({ gotoGame: true });
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchData();
    window.addEventListener('resize', this.onResize);
  }

  render() {
    const {
      total,
      gamesData,
      fetchingData,
      openGameIndex,
      gotoGame
    } = this.state;

    const rowRenderer = ({ key, index, style }) => (
      <div className={cardContainer} key={key} style={style}>
        <DailyGameCard
          {...gamesData[index]}
          gameIndex={index}
          openJoinModal={this.openJoin}
        />
      </div>
    );

    const listHeight = window.innerHeight - 135;

    return (
      <section className={container}>
        <Header routeLabel="Daily Games" />
        <div className={gamesList}>
          <nav>
            <span className={resultSummary}>
              {typeof total === 'number'
                ? `${total} TABLE${total > 1 ? 'S' : ''} FOUND`
                : ''}
            </span>
            <GameListFilters onComplete={this.onFiltersUpdate} />
          </nav>
          <div>
            <List
              width={window.innerWidth}
              height={listHeight}
              rowCount={gamesData.length}
              rowHeight={130}
              rowRenderer={rowRenderer}
            />
          </div>
          {fetchingData && <div className={loadingMask} />}
        </div>
        {typeof openGameIndex === 'number' && (
          <JoinDailyGameModal
            {...gamesData[openGameIndex]}
            close={this.closeJoin}
          />
        )}
        {gotoGame && <Redirect to={`/play/${gamesData[openGameIndex].id}`} />}
      </section>
    );
  }
}

export default UserConsumer(GamesConsumer(DailyGames));
