// npm libs
import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

// containers
import Home from 'containers/Home';

// components
import Header from 'components/Header';

// redux
import { history, store } from 'state';

const renderApp = () => (
  <BrowserRouter>
    <Provider store={store}>
      <section
        style={{
          backgroundColor: '#888',
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          margin: ' 0 auto',
          maxWidth: 500,
        }}
      >
        <Header />
        <section
          style={{
            backgroundColor: '#222',
            color: '#999',
            flex: 1,
            overflow: 'auto',
            padding: 15,
          }}
        >
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path={'/'} component={Home} />
            </Switch>
          </ConnectedRouter>
        </section>
      </section>
    </Provider>
  </BrowserRouter>
);

const App = () => {
  if (APP_SETTINGS.environment === 'development') {
    return <AppContainer>{renderApp()}</AppContainer>;
  }
  return renderApp();
};

App.propTypes = {};

export default App;
