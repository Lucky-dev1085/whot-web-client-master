import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { deleteModal, deleteInput } from './DeleteAccount.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import Modal from '../Modal';
import { TextInput } from '../../components/FormControls';
import Button from '../Button';

class DeleteModal extends Component {
  state = {
    formFields: {
      deleteText: { value: '', isValid: false }
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.deleteUser();
  };

  onInputChange = (name, value, isValid) => {
    const formFields = {
      ...this.state.formFields,
      [name]: { value, isValid }
    };

    this.setState({ formFields });
  };

  render() {
    const { authLoading, user, close } = this.props;
    const { formFields } = this.state;
    const { deleteText } = formFields;

    return (
      <Modal className={deleteModal} close={close}>
        <h4>DELETE ACCOUNT</h4>
        <p>
          Please type “Delete (Your Username)” to confirm you want to delete
          your account.
        </p>

        <form onSubmit={this.onSubmit}>
          <TextInput
            className={deleteInput}
            name="deleteText"
            value={deleteText.value}
            required={true}
            onChange={this.onInputChange}
            pattern={`Delete ${user.name}`}
            placeholder="Type Delete (Your Username)"
          />

          <Button
            disabled={authLoading || !deleteText.isValid}
            theme="secondary"
            size="md"
            block
          >
            CONFIRM AND DELETE
          </Button>
        </form>
      </Modal>
    );
  }
}

DeleteModal.propTypes = {
  close: PropTypes.func.isRequired
};

export default UserConsumer(DeleteModal);
