// npm libs
import React from 'react';
import ReactDOM from 'react-dom';

// containers
import Root from 'containers/Root';

// theme
import createStylesheet from 'styles/createStylesheet';

// styles
import 'styles/reset.css';

const styles = createStylesheet(theme => ({
  'background-color': theme.color.body,
  display: 'flex',
  flex: 1,
  height: '100vh',
  padding: `${theme.spacing.base}px 0`,
}));
const target = document.createElement('main');
target.setAttribute(
  'style',
  Object.keys(styles)
    .map(key => `${key}:${styles[key]}`)
    .join(';'),
);

document.body.appendChild(target);
ReactDOM.render(<Root />, target);

if (module.hot) {
  module.hot.accept('./containers/Root.jsx', () => {
    // eslint-disable-next-line
    const NextApp = require('./containers/Root.jsx').default;
    ReactDOM.render(<NextApp />, target);
  });
}
