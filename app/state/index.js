/* eslint no-underscore-dangle: "off" */

// npm libs
import createHistory from 'history/createBrowserHistory';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';

// redux
import reducers from 'state/reducers';

// react router config
const history = createHistory();
const reduxRouterMiddleware = routerMiddleware(history);
const reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : undefined;
const middlewares = [reduxRouterMiddleware, thunk];

if (APP_SETTINGS.environment === 'development') {
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducers, {}, reduxDevTool);

export { history, store };
