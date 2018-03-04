// npm libs
import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import PropTypes from 'prop-types';
import { AppContainer as HotLoaderContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';

// components
import Box from 'components/common/Box';
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
      overflow: 'hidden',
      position: 'relative',
    },
    bodyContainer: {
      backgroundColor: theme.color.white[700],
      boxShadow: theme.shadow.base(theme.color.white[500]),
      margin: '0 auto',
      maxWidth: theme.maxWidthContainer,
    },
  })),
);

const MainContainer = ({ body, header }) => (
  <Box className={css(styles.container)} column growH>
    {header()}
    <Box className={css(styles.bodyContainer)} grow growH>
      {body()}
    </Box>
  </Box>
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
