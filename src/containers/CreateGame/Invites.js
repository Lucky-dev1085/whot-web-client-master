import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  invitesContainer,
  invitesForm,
  playerSearch,
  playerSearchInput,
  formActions,
  playerOptions,
  loading,
  searchMessage,
  selectedPlayers,
  noInvites
} from './CreateGame.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import { GamesConsumer } from '../../contexts/GamesContext';
import { baseURL } from '../../utils/requests';
import { isMobile } from '../../utils';
import { TextInput } from '../../components/FormControls';
import Button from '../../components/Button';
import CircleCancelIcon from '../../vectors/CircleCancelIcon';
import Toast from '../../components/Toast';

class Invites extends Component {
  state = {
    searchQuery: '',
    searchResults: [],
    invited: []
  };

  formRef = createRef();
  queryTimeout = null;

  onQueryChange = (name, searchQuery) => {
    this.setState({ searchQuery });

    if (!isMobile()) {
      clearTimeout(this.queryTimeout);
      this.queryTimeout = setTimeout(() => {
        this.searchPlayers();
      }, 500);
    }
  };

  searchPlayers = e => {
    e && e.preventDefault();
    isMobile() && this.formRef.current.querySelector('input').blur();
    const { searchQuery } = this.state;

    this.setState({ isLoadingPlayers: true });

    if (!searchQuery) {
      this.setState({
        searchResults: [],
        searched: searchQuery
      });
      return;
    }

    axios
      .get(`${baseURL}player-names?nameSearch=${searchQuery}`)
      .then(({ data }) => {
        this.setState({
          searched: searchQuery,
          isLoadingPlayers: false,
          searchResults: data.player_details
        });
      })
      .catch(error => {
        this.setState({ isLoadingPlayers: false });
      });
  };

  addTolist = player => {
    const { invited } = this.state;
    this.setState({
      invited: [...invited, player]
    });
  };

  removeFromList = id => {
    const invited = this.state.invited.filter(item => item.id !== id);

    this.setState({ invited });
  };

  sendInvites = () => {
    const { id, sendGameInvites } = this.props;
    const invitedIds = this.state.invited.map(({ id }) => id);

    const data = {
      gameTableId: id,
      playerDetailIds: invitedIds
    };

    sendGameInvites(data);
  };

  render() {
    const {
      user,
      gameLoading,
      maxPlayerCount,
      gameInvitationSuccess,
      gameInvitationError,
      resetGameSuccess,
      resetGameError
    } = this.props;
    const {
      searchQuery,
      searchResults,
      searched,
      isLoadingPlayers,
      invited
    } = this.state;
    const filteredResults = searchResults.filter(
      ({ id }) =>
        id !== user.playerDetail.id && !invited.find(item => item.id === id)
    );

    return (
      <div className={invitesContainer}>
        <div className={invitesForm}>
          <div className={playerSearch}>
            <form onSubmit={this.searchPlayers} ref={this.formRef}>
              <TextInput
                className={playerSearchInput}
                type="search"
                name="searchQuery"
                label="INVITE USER"
                value={searchQuery}
                onChange={this.onQueryChange}
                placeholder="Search player's username"
              />
            </form>
            {maxPlayerCount - 1 > invited.length ? (
              <>
                {Boolean(filteredResults.length) && (
                  <ul
                    className={cx(playerOptions, {
                      [loading]: isLoadingPlayers
                    })}
                  >
                    {filteredResults.map(player => {
                      const { id, name } = player;
                      return (
                        <li key={id} onClick={() => this.addTolist(player)}>
                          <b>{searched}</b>
                          {name.substring(searched.length, name.length)}
                        </li>
                      );
                    })}
                  </ul>
                )}
                {searched && !filteredResults.length && (
                  <p className={searchMessage}>No Match found</p>
                )}
              </>
            ) : (
              <p className={searchMessage}>Maximum of {maxPlayerCount} users</p>
            )}
          </div>
          <div className={selectedPlayers}>
            <h5>INVITE LIST</h5>
            <ul>
              {invited.map(({ id, name }) => (
                <li key={id}>
                  <span>{name}</span>
                  <span onClick={() => this.removeFromList(id)}>
                    <CircleCancelIcon />
                  </span>
                </li>
              ))}
            </ul>
            {!invited.length && (
              <span className={noInvites}>No User Added</span>
            )}
          </div>
        </div>
        <div className={formActions}>
          <Link to="/dashboard">CANCEL</Link>
          <Button
            theme="secondary"
            disabled={!invited.length || gameLoading}
            onClick={this.sendInvites}
          >
            INVITE
          </Button>
        </div>
        {gameInvitationSuccess && (
          <Toast
            message="Invitations sent successfully"
            close={resetGameSuccess}
          />
        )}
        {gameInvitationError && (
          <Toast
            type="error"
            message={gameInvitationError}
            close={resetGameError}
          />
        )}
      </div>
    );
  }
}

Invites.propTypes = {
  maxPlayerCount: PropTypes.number.isRequired
};

export default UserConsumer(GamesConsumer(Invites));
