import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import {
  filterLabel,
  inactive,
  resetFilter,
  filterModal,
  filterBackdrop,
  filterContent,
  amountSelect,
  amountSelectLabel,
  amountOptions,
  amountOption,
  active,
  playersSelect,
  playersSelectLabel
} from './GameListFilters.module.sass';
import { NumberSelect } from '../FormControls';
import Button from '../Button';
import FilterIcon from '../../vectors/FilterIcon';
import CircleRemove from '../../vectors/CircleRemove';
import PurseIcon from '../../vectors/PurseIcon';
import PlayersIcon from '../../vectors/PlayersIcon';
import {
  STAKE_AMOUNT_OPTIONS as stakeAmountOptions,
  MIN_STAKE_AMOUNT_OPTIONS as minStakeAmountOptions
} from './GameListFilters.constant';

class GameListFilters extends Component {
  state = {
    playerCount: 1,
    activeAmount: stakeAmountOptions[0].label,
    stakeAmountQuery: {}
  };

  openFilters = () => {
    this.setState({ showFilters: true });
  };

  closeFilters = () => {
    this.setState({ showFilters: false });
  };

  setStakeAmount = (label, value) => {
    this.setState({
      activeAmount: label,
      stakeAmountQuery: value
    });
  };

  increasePlayerCount = () => {
    const { playerCount } = this.state;

    this.setState({ playerCount: Math.min(playerCount + 1, 5) });
  };

  decreasePlayerCount = () => {
    const { playerCount } = this.state;

    this.setState({ playerCount: Math.max(playerCount - 1, 1) });
  };

  onPlayerCountChange = value => {
    this.setState({ playerCount: Math.min(Math.max(value, 1), 5) });
  };

  onPlayerControlMouseDown = key => {
    this.setState({ [key]: true });
  };

  onPlayerControlMouseUp = key => {
    this.setState({ [key]: false });
  };

  applyFilters = () => {
    const { playerCount, stakeAmountQuery, activeAmount } = this.state;
    const { onComplete, withPlayerCount } = this.props;

    const filters = {
      stakeAmountQuery
    };

    if (withPlayerCount) {
      filters.maxPlayerCount = playerCount === 1 ? null : playerCount;
    }

    onComplete(filters);
    this.setState({
      appliedFilters: { playerCount, activeAmount },
      showFilters: false
    });
  };

  clearFilter = e => {
    e.stopPropagation();

    this.setState(
      {
        playerCount: 1,
        activeAmount: stakeAmountOptions[0].label,
        stakeAmountQuery: {}
      },
      this.applyFilters
    );
  };

  render() {
    const { withPlayerCount, useMinStake } = this.props;
    const {
      showFilters,
      activeAmount,
      playerCount,
      appliedFilters
    } = this.state;
    const noFilter =
      !appliedFilters ||
      (appliedFilters.activeAmount === stakeAmountOptions[0].label &&
        appliedFilters.playerCount === 1);
    const playerCountValueRender = value => (value === 1 ? 'All' : value);
    const stakeOptions = useMinStake
      ? minStakeAmountOptions
      : stakeAmountOptions;

    return (
      <>
        <span
          className={cx(filterLabel, { [inactive]: noFilter })}
          onClick={this.openFilters}
        >
          <FilterIcon /> FILTERS{' '}
          {!noFilter && (
            <span className={resetFilter} onClick={this.clearFilter}>
              <CircleRemove />
            </span>
          )}
        </span>
        {showFilters && (
          <div className={filterModal}>
            <div className={filterBackdrop} onClick={this.closeFilters} />
            <div className={filterContent}>
              <h4>FILTERS</h4>
              <div className={amountSelect}>
                <div className={amountSelectLabel}>
                  <PurseIcon /> STAKE AMOUNT
                </div>
                <div className={amountOptions}>
                  {stakeOptions.map(({ label, value }, index) => (
                    <span
                      className={cx(amountOption, {
                        [active]: activeAmount === label
                      })}
                      onClick={() => this.setStakeAmount(label, value)}
                      key={index}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              {withPlayerCount && (
                <div className={playersSelect}>
                  <div className={playersSelectLabel}>
                    <PlayersIcon /> PLAYER COUNT
                  </div>
                  <NumberSelect
                    value={playerCount}
                    onChange={this.onPlayerCountChange}
                    valueRender={playerCountValueRender}
                  />
                </div>
              )}
              <Button
                onClick={this.applyFilters}
                theme="secondary"
                size="md"
                block
              >
                APPLY
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }
}

GameListFilters.defaultProps = {
  withPlayerCount: true,
  useMinStake: true
};

GameListFilters.propTypes = {
  onComplete: PropTypes.func.isRequired,
  withPlayerCount: PropTypes.bool,
  useMinStake: PropTypes.bool
};

export default GameListFilters;
