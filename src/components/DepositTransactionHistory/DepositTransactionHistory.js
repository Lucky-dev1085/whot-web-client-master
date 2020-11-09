import React, { Component } from 'react';
import { List } from 'react-virtualized';
import cx from 'classnames';

import {
  container,
  cardContainer,
  transactionsList,
  loadMore,
  isLoading
} from './DepositTransactionHistory.module.sass';
import { deposits } from './resources';
import TransactionCard from '../TransactionCard';

class DepositTransactionHistory extends Component {
  state = {
    data: [],
    offset: 0
  };

  fetchData = () => {
    this.setState({ fetchingData: true });
    const { offset } = this.state;

    const queryParams = {
      $offset: offset,
      $limit: 10,
      $order: '-createdAt'
    };

    deposits
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

  onResize = () => {
    this.setState({ resized: true });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchData();
    window.addEventListener('resize', this.onResize);
  }

  render() {
    const { data, fetchingData, offset, total } = this.state;
    const hasFetchedAll = offset + 10 >= total;

    const rowRenderer = ({ key, index, style }) => (
      <div className={cardContainer} key={key} style={style}>
        {data[index] ? (
          <TransactionCard {...data[index]} />
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

    const listHeight = window.innerHeight - 105;

    return (
      <section className={container}>
        <header>
          <h4>TRANSACTION HISTORY</h4>
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

export default DepositTransactionHistory;
