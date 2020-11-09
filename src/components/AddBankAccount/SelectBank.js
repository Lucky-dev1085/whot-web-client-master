import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  bankSelect,
  bankSelectInput,
  formActions,
  back
} from './AddBankAccount.module.sass';
import { SelectInput } from '../FormControls';
import Button from '../Button';
import { BANKS as banks } from '../../config';

const bankOptions = [
  {
    label: 'Select Bank',
    value: ''
  },
  ...banks
];

const SelectBank = ({ selectedBank, saveBank, goBack }) => {
  const [bank, setBank] = useState(selectedBank);

  return (
    <div className={bankSelect}>
      <SelectInput
        className={bankSelectInput}
        options={bankOptions}
        name="bank"
        value={bank}
        onChange={(name, value) => setBank(value)}
      />
      <div className={formActions}>
        <span onClick={goBack} className={back}>
          BACK
        </span>
        <Button
          theme="secondary"
          disabled={!bank}
          onClick={() => saveBank(bank)}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

SelectBank.propTypes = {
  saveBank: PropTypes.func.isRequired,
  selectedBank: PropTypes.string.isRequired
};

export default SelectBank;
