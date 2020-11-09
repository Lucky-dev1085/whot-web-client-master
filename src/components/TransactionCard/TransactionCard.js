import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';

import {
  transactionCard,
  withStatus,
  depositAmount,
  route,
  transactionDate,
  transactionStatus,
  statusValue,
  completedTransaction,
  failedTransaction
} from './TransactionCard.module.sass';
import CirclePurse from '../../vectors/CirclePurse';

const TransactionCard = ({
  amount,
  origin,
  destination,
  createdAt,
  status,
  showStatus
}) => (
  <div className={cx(transactionCard, { [withStatus]: showStatus })}>
    <div className={depositAmount}>
      <h5>AMOUNT</h5>
      <div>
        <CirclePurse /> ₦
        {amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}
      </div>
    </div>
    <div className={route}>
      <h5>{origin ? 'SOURCE' : 'DESTINATION'}</h5>
      <div>{origin || destination}</div>
    </div>
    <div className={transactionDate}>
      <h5>DATE</h5>
      <div>{moment(createdAt).format('DD/MM/YY')}</div>
    </div>
    {showStatus && (
      <div className={transactionStatus}>
        <h5>STATUS</h5>
        <div
          className={cx(statusValue, {
            [completedTransaction]: status.toUpperCase() === 'SUCCESS',
            [failedTransaction]: status.toUpperCase() === 'FAILED'
          })}
        >
          {status}
        </div>
      </div>
    )}
  </div>
);

TransactionCard.propTypes = {
  amount: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  origin: PropTypes.string,
  destination: PropTypes.string,
  showStatus: PropTypes.bool
};

export default TransactionCard;
