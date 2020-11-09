import React, { Component } from 'react';
import { List } from 'react-virtualized';

import {
  container,
  gamesList,
  resultSummary,
  cardContainer,
  loadingMask
} from './Tournaments.module.sass';
import Header from '../../components/Header';
import {
  TournamentCard,
  JoinTournamentModal
} from '../../components/GameCards';
import { GamesConsumer } from '../../contexts/GamesContext';
import { UserConsumer } from '../../contexts/UserContext';
import GameListFilters from '../../components/GameListFilters';
import { tournaments } from './resources';

class Tournaments extends Component {
  state = {
    gamesData: [],
    stakeAmountQuery: {}
  };

  fetchData = () => {
    this.setState({ fetchingData: true });
    const { stakeAmountQuery } = this.state;

    const queryParams = {
      $order: '-featured',
      $offset: 0,
      $limit: 1000,
      state: 'PENDING',
      ...stakeAmountQuery
    };

    tournaments
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
      this.closeJoin();
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchData();
    window.addEventListener('resize', this.onResize);
  }

  render() {
    const { total, gamesData, fetchingData, openGameIndex } = this.state;

    const rowRenderer = ({ key, index, style }) => (
      <div className={cardContainer} key={key} style={style}>
        <TournamentCard
          {...gamesData[index]}
          gameIndex={index}
          openJoinModal={this.openJoin}
        />
      </div>
    );

    const listHeight = window.innerHeight - 135;

    return (
      <section className={container}>
        <Header routeLabel="Tournaments" />
        <div className={gamesList}>
          <nav>
            <span className={resultSummary}>
              {typeof total === 'number'
                ? `${total} TOURNAMENT${total > 1 ? 'S' : ''}`
                : ''}
            </span>
            <GameListFilters
              onComplete={this.onFiltersUpdate}
              withPlayerCount={false}
              useMinStake={false}
            />
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
          <JoinTournamentModal
            {...gamesData[openGameIndex]}
            close={this.closeJoin}
          />
        )}
      </section>
    );
  }
}

export default UserConsumer(GamesConsumer(Tournaments));
