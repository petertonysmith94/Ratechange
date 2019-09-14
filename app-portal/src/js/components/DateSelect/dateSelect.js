import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import Label from '../Label';
import { InputWrapper, Field } from './dateSelect.styles';

const DateSelect = (props) => {
  const {
    label,
    margin,
    name,
    value,
    onChange,
  } = props;

  return (
    <InputWrapper margin={ margin }>
      <Label
        name={ name }
        label={ label }
      />
      <Field
        name={ name }
        selected={ value }
        onChange={ (value) => onChange(value) }
      />
    </InputWrapper>
  );
};

DateSelect.defaultProps = {
  label: '',
  margin: '0'
};

DateSelect.propTypes = {
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateSelect;