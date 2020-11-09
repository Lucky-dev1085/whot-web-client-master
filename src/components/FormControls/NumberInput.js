import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextInput from './TextInput';

class NumberInput extends Component {
  onChange = (name, value, isValid) => {
    const intValue = this.getIntValue(value);
    this.props.onChange(name, intValue, isValid);
  };

  getIntValue = value => {
    const intValue = value.replace(/\D/g, '');
    const absoluteValue = Math.abs(intValue);
    const nonLeadingZeroValue = absoluteValue ? absoluteValue.toString() : '';
    return this.props.allowLeadingZeros ? intValue : nonLeadingZeroValue;
  };

  validator = value => {
    const { validator } = this.props;
    const intValue = this.getIntValue(value);
    return Boolean(intValue) && (validator ? validator(intValue) : true);
  };

  render() {
    const { onChange, allowLeadingZeros, ...rest } = this.props;

    return (
      <TextInput
        type="tel"
        onChange={this.onChange}
        validator={this.validator}
        {...rest}
      />
    );
  }
}

NumberInput.defaultProps = {
  maxLength: 15
};

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  allowLeadingZeros: PropTypes.bool,
  validator: PropTypes.func,
  required: PropTypes.bool,
  validatorError: PropTypes.string,
  valueMissing: PropTypes.string
};

export default NumberInput;
