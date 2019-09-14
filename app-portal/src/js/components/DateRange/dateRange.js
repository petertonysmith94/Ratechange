import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import { Wrapper } from './dateRange.styles';
import DateSelect from '../DateSelect';

const DateRange = (props) => {
  const {
    from,
    to,
    onChange
  } = props;

  return (
    <Wrapper>
      <DateSelect
        label='Date from'
        name='from'
        value={ from }
        onChange={ (value) => onChange({ from: value, to }) }
        max={ to }
      />

      <DateSelect
        label='Date to'
        name='to'
        value={ to }
        onChange={ (value) => onChange({ from, to: value }) }
        min={ from }
        max={ new Date() }
      />
    </Wrapper>
  );
};

DateRange.defaultProps = {};

DateRange.propTypes = {
  from: PropTypes.instanceOf(Date).isRequired,
  to: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired
};

export default DateRange;