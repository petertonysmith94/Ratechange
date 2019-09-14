import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import { StyledLabel } from './label.styles';

const Label = (props) => {
  const {
    name,
    label,
    required
  } = props;

  if (!label)
    return null;

  return (
    <StyledLabel
      htmlFor={ name }
    >
      { label }{ required && <sup>*</sup> }
    </StyledLabel>
  )
}

Label.defaultProps = {
  label: '',
  required: false
};

Label.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool
};

export default Label;