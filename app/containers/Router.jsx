// npm libs
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { ConnectedRouter } from 'react-router-redux';

// redux
import { history } from 'state';

// constants
import { routes } from 'constants/index';

// containers
import Home from 'containers/Home';

const Router = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={routes.HOME} component={Home} />
    </Switch>
  </ConnectedRouter>
);

export default Router;
