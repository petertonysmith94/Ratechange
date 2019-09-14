import React from 'react';
import PropTypes from 'prop-types';
import { memoize } from 'lodash';

// COMPONENTS & STYLES
import { DropdownWrapper, StyledDropdown } from './dropdown.styles'; 
import Label from '../Label';

// HELPERS

/**
 * Replaces spaces with dashes
 * 
 * @param {string} name 
 */
function computeMachineName(name) {
  return name.toLowerCase().replace(/ /g, '-');
};

// Caches the machine name for a given name
const getMachineName = memoize(computeMachineName);

const Dropdown = (props) => {
  const {
    label,
    name,
    data,
    value,
    onChange,
    required,
  } = props;

  return (
    <DropdownWrapper>
      <Label
        label={ label }
        name={ name }
        required={ required }
      />
      <select
        value={ value }
        onChange={ (e) => onChange({ e, value: e.target.value }) }
      >
        { data.map( (option) => (
          <option
            key={ getMachineName(option) }
            value={ getMachineName(option) }
          >
            { option }
          </option>
        )) }
      </select>
    </DropdownWrapper>
  );
};

Dropdown.defaultProps = {
  label: '',
  value: '',
  onChange: () => null,
  required: false
};

Dropdown.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool
};

export default Dropdown;