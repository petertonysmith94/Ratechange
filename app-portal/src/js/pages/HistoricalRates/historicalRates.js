import React from 'react';
import subDays from 'date-fns/subDays';

// COMPONENTS & STYLES
import DateRange from '../../components/DateRange';
import Exchange from '../../components/Exchange';
import Chart from './historicalRates.chart';

// HELPERS
import { reducer } from './historicalRates.reducer';

const HistoricalRates = (props) => {

  const [state, dispatch] = React.useReducer(reducer, {
    exchange: {
      base: '',
      foreign: ''
    },
    dates: {
      from: subDays(new Date(), 7),
      to: new Date()
    }
  });

  return (
    <div>
      { /* The exchange rate converter */ }
      <Exchange
        base={ state.exchange.base }
        foreign={ state.exchange.foreign }
        onChange={ (value) => dispatch({ type: 'SET_EXCHANGE', value }) }
        onSwitch={ () => dispatch({ type: 'SWITCH_CURRENCIES' }) }
      />

      { /* Date range selector */ }
      <DateRange
        from={ state.dates.from }
        to={ state.dates.to }
        onChange={ (value) => dispatch({ type: 'SET_DATES', value }) }
      />

      { /* Historical chart */ }
      <Chart
        { ...state.exchange }
        { ...state.dates }
      />
    </div>
  );
};

export default HistoricalRates;