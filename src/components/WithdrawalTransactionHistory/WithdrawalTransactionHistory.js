import React, { Component } from 'react';
import { List } from 'react-virtualized';
import cx from 'classnames';

import {
  container,
  search,
  cardContainer,
  transactionsList,
  loadMore,
  isLoading
} from './WithdrawalTransactionHistory.module.sass';
import { withdrawals } from './resources';
import TransactionCard from '../TransactionCard';
import SearchIcon from '../../vectors/SearchIcon';

class WithdrawalTransactionHistory extends Component {
  state = {
    data: [],
    offset: 0,
    query: ''
  };

  queryTimeout = null;

  fetchData = () => {
    this.setState({ fetchingData: true });
    const { offset, query } = this.state;

    const queryParams = {
      $offset: offset,
      $limit: 10,
      $order: '-createdAt',
      $searchFields: 'accountNumber'
    };

    if (query) {
      queryParams['$q'] = query;
    }

    withdrawals
      .get(queryParams, true)
      .then(({ data }) => {
        this.setState({
          data: [...this.state.data, ...data.data],
          total: data.total,
          fetchingData: false
        });
      })
      .catch(error => {
        this.setState({ fetchingData: false });
      });
  };

  loadMore = () => {
    const { offset, fetchingData } = this.state;

    if (fetchingData) {
      return;
    }

    this.setState(
      {
        offset: offset + 10
      },
      this.fetchData
    );
  };

  onQueryChange = e => {
    this.setState({ query: e.target.value });

    clearTimeout(this.queryTimeout);
    this.queryTimeout = setTimeout(() => {
      this.setState({ data: [], offset: 0 }, this.fetchData);
    }, 500);
  };

  onResize = () => {
    this.setState({ resized: true });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchData();
    window.addEventListener('resize', this.onResize);
  }

  render() {
    const { data, fetchingData, offset, total, query } = this.state;
    const hasFetchedAll = offset + 10 >= total;

    const rowRenderer = ({ key, index, style }) => {
      const currData = data[index];

      return (
        <div className={cardContainer} key={key} style={style}>
          {currData ? (
            <TransactionCard
              destination={currData.accountNumber}
              showStatus={true}
              {...currData}
            />
          ) : (
            <div className={loadMore}>
              <span
                className={cx({ [isLoading]: fetchingData })}
                onClick={this.loadMore}
              >
                {fetchingData ? 'LOADING...' : 'SHOW MORE'}
              </span>
            </div>
          )}
        </div>
      );
    };

    const listHeight = window.innerHeight - 105;

    return (
      <section className={container}>
        <header>
          <h4>TRANSACTION HISTORY</h4>
          <div className={search}>
            <SearchIcon />
            <input
              value={query}
              type="text"
              placeholder="SEARCH"
              onChange={this.onQueryChange}
            />
          </div>
        </header>
        <div className={transactionsList}>
          <div>
            <List
              width={window.innerWidth}
              height={listHeight}
              rowCount={hasFetchedAll ? data.length : data.length + 1}
              rowHeight={80}
              rowRenderer={rowRenderer}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default WithdrawalTransactionHistory;
