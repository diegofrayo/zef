// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = StyleSheet.create(createStylesheet(theme => ({
  container: {
    backgroundColor: theme.color.white[100],
    borderRadius: 5,
    boxShadow: '0px 0px 10px 1px rgb(202, 202, 202)',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    margin: '10px auto',
    maxWidth: theme.maxWidthContainer,
    overflow: 'hidden',
    position: 'relative',
    '@media screen and (max-width : 767px)': {
      borderRadius: 0,
      margin: '0 auto',
    },
  },
  bodyContainer: {
    backgroundColor: theme.color.white[100],
    flex: 1,
    overflow: 'auto',
    padding: theme.spacing.medium,
  },
})));

const App = ({ body, header }) => (
  <section className={css(styles.container)}>
    {header()}
    <section className={css(styles.bodyContainer)}>
      {body()}
    </section>
  </section>
);

App.propTypes = {
  body: PropTypes.func.isRequired,
  header: PropTypes.func.isRequired,
};

export default App;
