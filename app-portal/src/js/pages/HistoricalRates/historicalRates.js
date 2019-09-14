import React from 'react';

// COMPONENTS
import Button from '../../components/Button';

const HistoricalRates = (props) => {

  return (
    <div>
      <Button
        name='hello'
        iconBefore='home'
        onClick={ () => console.log('clicked') }
      >
        Hello
      </Button>
    </div>
  );
};

export default HistoricalRates;