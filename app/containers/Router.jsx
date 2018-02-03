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
import RecyclingAgents from 'containers/RecyclingAgents';
import HowToRecycle from 'containers/HowToRecycle';
import Contact from 'containers/Contact';

const Router = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={routes.CONTACT} component={Contact} />
      <Route exact path={routes.HOW_TO_RECYCLE} component={HowToRecycle} />
      <Route exact path={routes.RECYCLING_AGENTS} component={RecyclingAgents} />
      <Route path={routes.HOME} component={RecyclingAgents} />
    </Switch>
  </ConnectedRouter>
);

export default Router;
