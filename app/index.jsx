// npm libs
import React from 'react';
import ReactDOM from 'react-dom';

// containers
import Root from 'pages';

// theme
import { createStylesheet } from 'styles/createStylesheet';

// services
import 'services/Tracking';

// styles
import 'styles/reset.css';

const styles = createStylesheet(theme => ({
  'background-color': theme.color.white[650],
  display: 'flex',
  flex: 1,
  height: '100vh',
}));

const target = document.createElement('main');
target.setAttribute('id', 'main-container');
target.setAttribute(
  'style',
  Object.entries(styles)
    .map(([key, value]) => `${key}:${value}`)
    .join(';'),
);

document.body.appendChild(target);
ReactDOM.render(<Root />, target);

if (module.hot) {
  module.hot.accept('./pages/index.jsx', () => {
    const NextApp = require('./pages/index.jsx').default; // eslint-disable-line
    ReactDOM.render(<NextApp />, target);
  });
}
