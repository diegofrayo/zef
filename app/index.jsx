// npm libs
import React from 'react';
import ReactDOM from 'react-dom';

// containers
import App from 'containers/App';

// styles
import 'styles/reset.css';

const target = document.getElementById('app');

ReactDOM.render(<App />, target);

if (module.hot) {
  module.hot.accept('./containers/App.jsx', () => {
    const NextApp = require('./containers/App.jsx').default;
    ReactDOM.render(<NextApp />, target);
  });
}

