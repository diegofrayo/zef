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
import Contact from 'containers/Contact';
import Home from 'containers/Home';
import HowToRecycle from 'containers/HowToRecycle';
import RecyclingAgents from 'containers/RecyclingAgents';

const Router = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={routes.CONTACT} component={Contact} />
      <Route exact path={routes.HOW_TO_RECYCLE} component={HowToRecycle} />
      <Route exact path={routes.RECYCLING_AGENTS} component={RecyclingAgents} />
      <Route exact path={routes.HOME} component={Home} />
    </Switch>
  </ConnectedRouter>
);

export default Router;
