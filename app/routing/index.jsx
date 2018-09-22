// npm libs
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { ConnectedRouter } from 'react-router-redux';

// redux
import { history } from 'state';

// containers
import Home from 'pages/Home';
import RecyclingAgents from 'pages/RecyclingAgents';

const ROOT = APP_SETTINGS.environment === 'development' ? '' : '/zef';
const routes = {
  HOME: ROOT === '' ? '/' : ROOT,
  CONTACT: `${ROOT}/contacto`,
  HOW_TO_RECYCLE: `${ROOT}/como-reciclar`,
  PROJECTS: `${ROOT}/proyectos`,
  RECYCLING_AGENTS: `${ROOT}/donde-reciclar`,
  STATISTICS: `${ROOT}/estadisticas`,
};

const Router = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={routes.RECYCLING_AGENTS} component={RecyclingAgents} />
      <Route exact path={routes.HOME} component={Home} />
    </Switch>
  </ConnectedRouter>
);

const goTo = route => {
  history.push(route);
};

export { Router, routes, goTo };
