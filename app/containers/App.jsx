// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

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

const App = ({ body, header }) => (
  <section className={css(styles.container)}>
    {header()}
    <section className={css(styles.bodyContainer)} id="app-content-container">
      {body()}
    </section>
  </section>
);

App.propTypes = {
  body: PropTypes.func.isRequired,
  header: PropTypes.func.isRequired,
};

export default App;
