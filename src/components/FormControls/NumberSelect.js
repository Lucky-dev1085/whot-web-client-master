import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  numberSelect,
  numberSelectControl,
  focused,
  numberSelectValue
} from './FormControl.module.sass';
import MinusIcon from '../../vectors/MinusIcon';
import PlusIcon from '../../vectors/PlusIcon';

class NumberSelect extends Component {
  state = {};

  onPlayerControlMouseDown = key => {
    this.setState({ [key]: true });
  };

  onPlayerControlMouseUp = key => {
    this.setState({ [key]: false });
  };

  render() {
    const { minusClick, plusClick } = this.state;
    const { className, value, onChange, valueRender } = this.props;

    return (
      <div className={cx(numberSelect, className)}>
        <span
          className={cx(numberSelectControl, {
            [focused]: minusClick
          })}
          onClick={() => onChange(value - 1)}
          onMouseDown={() => this.onPlayerControlMouseDown('minusClick')}
          onMouseUp={() => this.onPlayerControlMouseUp('minusClick')}
        >
          <MinusIcon />
        </span>
        <span className={numberSelectValue}>
          {valueRender ? valueRender(value) : value}
        </span>
        <span
          className={cx(numberSelectControl, {
            [focused]: plusClick
          })}
          onClick={() => onChange(value + 1)}
          onMouseDown={() => this.onPlayerControlMouseDown('plusClick')}
          onMouseUp={() => this.onPlayerControlMouseUp('plusClick')}
        >
          <PlusIcon />
        </span>
      </div>
    );
  }
}

NumberSelect.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  valueRender: PropTypes.func
};

export default NumberSelect;
