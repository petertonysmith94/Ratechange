import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const renderApp = () => {
  ReactDOM.render(
    <App />,
    document.getElementById("app")
  );
}

// Renders the application
renderApp();
