// npm libs
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { ConnectedRouter } from 'react-router-redux';

// redux
import { history } from 'state';

// containers
import Contact from 'pages/Contact';
import Home from 'pages/Home';
import HowToRecycle from 'pages/HowToRecycle';
import Projects from 'pages/Projects';
import RecyclingAgents from 'pages/RecyclingAgents';
import Statistics from 'pages/Statistics';

const ROOT = APP_SETTINGS.environment === 'development' ? '' : '/zef';
const routes = {
  HOME: ROOT === '' ? '/' : ROOT,
  CONTACT: `${ROOT}/contacto`,
  HOW_TO_RECYCLE: `${ROOT}/como-reciclar`,
  PROJECTS: `${ROOT}/proyectos`,
  RECYCLING_AGENTS: `${ROOT}/donde-reciclar`,
  STATISTICS: `${ROOT}/estadísticas`,
};

const Router = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={routes.CONTACT} component={Contact} />
      <Route exact path={routes.HOW_TO_RECYCLE} component={HowToRecycle} />
      <Route exact path={routes.PROJECTS} component={Projects} />
      <Route exact path={routes.RECYCLING_AGENTS} component={RecyclingAgents} />
      <Route exact path={routes.STATISTICS} component={Statistics} />
      <Route exact path={routes.HOME} component={Home} />
    </Switch>
  </ConnectedRouter>
);

export { Router, routes };
