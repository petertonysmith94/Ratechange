import React from 'react';
import Tabs from '../components/Tabs'

class App extends React.Component {
  render() {
    return (
      <Tabs
        panes={[
          { title: 'Live Rates', render: () => 'To implement' },
          { title: 'Historical Rates', render: () => 'To implement' }
        ]}
      />
    );
  }  
}

export default App;