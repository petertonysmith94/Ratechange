import React from 'react';

// COMPONENTS
import Exchange from '../../components/Exchange';
import Button from '../../components/Button';
import Conversion from './liveRate.conversion';

// HELPERS
import { reducer } from './liveRates.reducer';

const LiveRates = () => {

  const [state, dispatch] = React.useReducer(reducer, {
    exchange: {
      amount: '1',
      base: '',
      foreign: ''
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

      { /* Shows the currency conversion */ }
      <Conversion
        skip={ state.skip }
        onComplete={ () => dispatch({ type: 'CONVERSION_COMPLETE' }) }
        { ...state.exchange }
      />
    </div>
  );
};

export default LiveRates;