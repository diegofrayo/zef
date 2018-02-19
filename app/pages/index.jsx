// npm libs
import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import PropTypes from 'prop-types';
import { AppContainer as HotLoaderContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';

// components
import Header from 'components/layout/Header';

// Routing
import { Router } from 'routing';

// redux
import { store } from 'state';

// theme
import { createStylesheet } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      [theme.mediaQueries.mobile.css]: {
        borderRadius: 0,
        margin: '0 auto',
      },
    },
    bodyContainer: {
      backgroundColor: theme.color.white[700],
      boxShadow: theme.shadow.base(theme.color.white[500]),
      flex: 1,
      margin: '0 auto',
      maxWidth: theme.maxWidthContainer,
      overflow: 'auto',
      padding: theme.spacing.medium,
      width: '100%',
    },
  })),
);

const MainContainer = ({ body, header }) => (
  <section className={css(styles.container)}>
    {header()}
    <section className={css(styles.bodyContainer)} id="app-content-container">
      {body()}
    </section>
  </section>
);

MainContainer.propTypes = {
  body: PropTypes.func.isRequired,
  header: PropTypes.func.isRequired,
};

const renderApp = () => (
  <BrowserRouter>
    <Provider store={store}>
      <MainContainer header={() => <Header />} body={() => <Router />} />
    </Provider>
  </BrowserRouter>
);

export default () => {

  if (APP_SETTINGS.environment === 'development') {
    return <HotLoaderContainer>{renderApp()}</HotLoaderContainer>;
  }

  return renderApp();
};
