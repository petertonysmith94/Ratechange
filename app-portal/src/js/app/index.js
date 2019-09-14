import React from 'react';

// COMPONENTS
import Tabs from '../components/Tabs'
import HistoricalRates from '../pages/HistoricalRates';
import LiveRates from '../pages/LiveRates';

class App extends React.Component {
  render() {
    return (
      <Tabs
        panes={[
          { title: 'Live Rates', render: () => <LiveRates /> },
          { title: 'Historical Rates', render: () => <HistoricalRates /> }
        ]}
      />
    );
  }  
}

export default App;