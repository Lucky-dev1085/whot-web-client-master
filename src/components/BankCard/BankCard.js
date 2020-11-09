import React from 'react';
import PropTypes from 'prop-types';

import { bankCard } from './BankCard.module.sass';

const BankCard = ({
  name,
  id,
  accountNumber,
  selectedBankId,
  onSelect,
  selectedColor
}) => (
  <div
    className={bankCard}
    style={{ borderColor: selectedBankId === id && selectedColor }}
    onClick={() => onSelect && onSelect({ name, id, accountNumber })}
  >
    <h4>{name}</h4>
    <p>
      ACCOUNT ENDING WITH <span>{accountNumber.substring(6, 10)}</span>
    </p>
  </div>
);

BankCard.defaultProps = {
  selectedColor: '#ffffff'
};

BankCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  accountNumber: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  selectedBankId: PropTypes.number,
  selectedColor: PropTypes.string
};

export default BankCard;
