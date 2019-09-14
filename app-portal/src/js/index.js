import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import client from './helpers/apollo';
import { ApolloProvider } from 'react-apollo';

const renderApp = () => {
  ReactDOM.render(
    <ApolloProvider client={ client }>
      <App />
    </ApolloProvider>,
    document.getElementById("app")
  );
}

// Renders the application
renderApp();
