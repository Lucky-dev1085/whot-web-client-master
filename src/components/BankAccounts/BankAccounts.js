import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  bankAccounts,
  withListLabel,
  addNewLink,
  allBanks,
  withCompleteAction
} from './BankAccounts.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import PlusMenuIcon from '../../vectors/PlusMenuIcon';
import BankAccountList from './BankAccountList';
import Toast from '../Toast';
import Button from '../Button';

const BankAccounts = ({
  playerBankAccountsLoading,
  playerBankAccounts,
  bankAccountSuccess,
  resetAuthSuccess,
  bankAccountError,
  resetAuthError,
  label,
  listLabel,
  onSelectComplete,
  selectedColor
}) => {
  const [selectedBank, setSelectedBank] = useState(null);

  useEffect(() => {
    return () => {
      bankAccountSuccess && resetAuthSuccess();
      bankAccountError && resetAuthError();
    };
  }, [bankAccountSuccess, bankAccountError, resetAuthSuccess, resetAuthError]);

  return (
    <div className={cx(bankAccounts, { [withListLabel]: listLabel })}>
      <h5>{label}</h5>
      {!playerBankAccountsLoading && (
        <>
          {playerBankAccounts.length ? (
            <div className={allBanks}>
              <BankAccountList
                onSelect={setSelectedBank}
                listLabel={listLabel}
                canDelete={!onSelectComplete}
                selectedColor={selectedColor}
              />
              <div className={cx({ [withCompleteAction]: onSelectComplete })}>
                <Link to="/account/bank-accounts/add" className={addNewLink}>
                  <PlusMenuIcon /> ADD MORE
                </Link>
                {onSelectComplete && (
                  <Button
                    theme="secondary"
                    onClick={() => onSelectComplete(selectedBank)}
                    disabled={!selectedBank}
                  >
                    NEXT
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <Link to="/account/bank-accounts/add" className={addNewLink}>
              <PlusMenuIcon /> ADD BANK ACCOUNT
            </Link>
          )}
        </>
      )}
      {bankAccountSuccess && (
        <Toast
          message="Bank Account added successfully"
          close={resetAuthSuccess}
        />
      )}
      {bankAccountError && (
        <Toast type="error" message={bankAccountError} close={resetAuthError} />
      )}
    </div>
  );
};

BankAccountList.defaultProps = {
  label: 'MY BANK ACCOUNTS'
};

BankAccountList.propTypes = {
  label: PropTypes.string,
  listLabel: PropTypes.string,
  onSelectComplete: PropTypes.func,
  selectedColor: PropTypes.string
};

export default UserConsumer(BankAccounts);
