import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { InputWrapper, Field } from './input.styles';
import Label from '../Label';

const Input = (props) => {
  const {
    label,
    type,
    name,
    value,
    onChange,
    margin
  } = props;

  return (
    <InputWrapper margin={ margin }>
      <Label
        name={ name }
        label={ label }
      />
      <Field
        name={ name }
        type={ type }
        value={ value }
        onChange={ (e) => onChange({ e, value: e.target.value }) }
      />
    </InputWrapper>
  );
};

Input.defaultProps = {
  label: '',
  type: 'text',
  margin: '0'
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf([ 'text', 'number' ]),
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  margin: PropTypes.string
};

export default Input;