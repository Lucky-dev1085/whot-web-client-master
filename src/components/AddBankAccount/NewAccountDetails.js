import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  newAccountDetailsForm,
  formActions,
  back
} from './AddBankAccount.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import {
  TextInput,
  isFormValid,
  getFormValues
} from '../../components/FormControls';
import Button from '../../components/Button';
import { isValidumber } from '../../utils';
import { BANKS as banks } from '../../config';

class NewAccountDetails extends Component {
  state = {
    formFields: {
      accountNumber: { value: '', isValid: false },
      accountBvn: { value: '', isValid: false }
    }
  };

  onInputChange = (name, value, isValid) => {
    const formFields = {
      ...this.state.formFields,
      [name]: { value, isValid }
    };

    this.setState({ formFields });
  };

  onSubmit = e => {
    e.preventDefault();
    const { user, bankId, addBankAccount } = this.props;
    const name = banks.find(({ value }) => value === bankId).label;
    const bankData = getFormValues(this.state.formFields);

    const formData = {
      name,
      bankId: 1,
      playerDetailId: user.playerDetail.id,
      ...bankData
    };

    addBankAccount(formData);
  };

  render() {
    const { authLoading, goBack } = this.props;
    const { formFields } = this.state;
    const { accountNumber, accountBvn } = formFields;

    const isValidForm = isFormValid(formFields);

    return (
      <form onSubmit={this.onSubmit}>
        <div className={newAccountDetailsForm}>
          <TextInput
            type="tel"
            name="accountNumber"
            label="ACCOUNT NUMBER"
            value={accountNumber.value}
            required={true}
            onChange={this.onInputChange}
            minLength={10}
            maxLength={10}
            placeholder="0123456789"
            validator={isValidumber}
            errorTip="Invalid account number"
          />

          <TextInput
            type="tel"
            name="accountBvn"
            label="BVN"
            value={accountBvn.value}
            required={true}
            onChange={this.onInputChange}
            minLength={11}
            maxLength={11}
            placeholder="0123456789"
            validator={isValidumber}
            errorTip="Invalid BVN"
          />
        </div>

        <div className={formActions}>
          <span className={back} onClick={goBack}>
            BACK
          </span>
          <Button theme="secondary" disabled={authLoading || !isValidForm}>
            NEXT
          </Button>
        </div>
      </form>
    );
  }
}

NewAccountDetails.propTypes = {
  goBack: PropTypes.func.isRequired
};

export default UserConsumer(NewAccountDetails);
