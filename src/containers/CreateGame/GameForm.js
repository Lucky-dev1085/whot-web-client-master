import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  formContainer,
  formControls,
  gameInfo,
  amountColumn,
  balance,
  timeColumn,
  playersColumn,
  createFormActions
} from './CreateGame.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import { GamesConsumer } from '../../contexts/GamesContext';
import Button from '../../components/Button';
import {
  TextInput,
  MoneyInput,
  DatePicker,
  NumberSelect,
  isFormValid,
  getFormValues
} from '../../components/FormControls';
import Toast from '../../components/Toast';

class GameForm extends Component {
  state = {
    formFields: {
      tableTitle: { value: '', isValid: false },
      minStakeAmount: { value: '', isValid: false },
      startingAt: { value: null, isValid: false },
      maxPlayerCount: { value: 2, isValid: true }
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { formFields } = this.state;
    const formData = getFormValues(formFields);

    const gameData = {
      gameType: 'private',
      ...formData
    };

    this.props.createGame(gameData, this.props.onSuccess);
  };

  onInputChange = (name, value, isValid) => {
    const formFields = {
      ...this.state.formFields,
      [name]: { value, isValid }
    };

    this.setState({ formFields });
  };

  onPlayerCountChange = value => {
    const playerCount = Math.min(Math.max(value, 2), 5);
    this.onInputChange('maxPlayerCount', playerCount, true);
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    const { gameError, resetGameError } = this.props;
    gameError && resetGameError();
  }

  render() {
    const { user, gameLoading, gameError, resetGameError } = this.props;
    const { formFields } = this.state;
    const {
      tableTitle,
      minStakeAmount,
      startingAt,
      maxPlayerCount
    } = formFields;

    const isValidForm = isFormValid(formFields);

    return (
      <>
        <div className={formContainer}>
          <form onSubmit={this.onSubmit}>
            <div className={formControls}>
              <TextInput
                name="tableTitle"
                label="TABLE NAME"
                value={tableTitle.value}
                required={true}
                onChange={this.onInputChange}
                placeholder="Enter your table name"
              />

              <div className={gameInfo}>
                <div className={amountColumn}>
                  <MoneyInput
                    name="minStakeAmount"
                    label="STAKE AMOUNT"
                    value={minStakeAmount.value}
                    onChange={this.onInputChange}
                    placeholder="Enter amount"
                    required={true}
                  />
                  <p className={balance}>
                    (DEPOSIT BAG{' '}
                    {user.playerDetail.depositBalance.toLocaleString('en-US', {
                      maximumFractionDigits: 2
                    })}
                    )
                  </p>
                </div>
                <div className={timeColumn}>
                  <DatePicker
                    name="startingAt"
                    label="START TIME"
                    selected={startingAt.value}
                    onChange={this.onInputChange}
                    placeholder="Select"
                    minTime={new Date()}
                    maxTime={new Date().setHours(23, 59)}
                    timeSelect={true}
                    required={true}
                  />
                </div>
                <div className={playersColumn}>
                  <label>PLAYER COUNT</label>
                  <NumberSelect
                    value={maxPlayerCount.value}
                    onChange={this.onPlayerCountChange}
                  />
                </div>
              </div>
            </div>
            <div className={createFormActions}>
              <Link to="/dashboard">CANCEL</Link>
              <Button theme="secondary" disabled={!isValidForm || gameLoading}>
                CREATE
              </Button>
            </div>
          </form>
        </div>
        {gameError && (
          <Toast type="error" message={gameError} close={resetGameError} />
        )}
      </>
    );
  }
}

GameForm.propTypes = {
  onSuccess: PropTypes.func.isRequired
};

export default UserConsumer(GamesConsumer(GameForm));
