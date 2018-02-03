// npm libs
import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

// components
import App from 'containers/App';
import Header from 'components/Header';
import Router from 'containers/Router';

// redux
import { store } from 'state';

const renderApp = () => (
  <BrowserRouter>
    <Provider store={store}>
      <App
        header={() => <Header />}
        body={() => <Router />}
      />
    </Provider>
  </BrowserRouter>
);

const Root = () => {

  if (APP_SETTINGS.environment === 'development') {
    return <AppContainer>{renderApp()}</AppContainer>;
  }

  return renderApp();
};

export default Root;
