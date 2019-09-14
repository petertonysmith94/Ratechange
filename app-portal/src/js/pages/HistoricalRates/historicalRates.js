import React from 'react';

// COMPONENTS & STYLES
import DateRange from '../../components/DateRange';
import Exchange from '../../components/Exchange';

// HELPERS
import { reducer } from './historicalRates.reducer';

const HistoricalRates = (props) => {

  const [state, dispatch] = React.useReducer(reducer, {
    exchange: {
      amount: '1',
      base: '',
      foreign: ''
    },
    dates: {
      from: new Date(),
      to: new Date()
    }
  });

  return (
    <div>
      { /* The exchange rate converter */ }
      <Exchange
        amount={ state.exchange.amount }
        base={ state.exchange.base }
        foreign={ state.exchange.foreign }
        onChange={ (value) => dispatch({ type: 'SET_EXCHANGE', value }) }
      />

      { /* Date range selector */ }
      <DateRange
        from={ state.dates.from }
        to={ state.dates.to }
        onChange={ (value) => dispatch({ type: 'SET_DATES', value }) }
      />
    </div>
  );
};

export default HistoricalRates;