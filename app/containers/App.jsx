// npm libs
import React from 'react';
import PropTypes from 'prop-types';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = createStylesheet(theme => ({
  container: {
    backgroundColor: theme.color.backgroundPrimary,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    margin: ' 0 auto',
    maxWidth: theme.maxWidthContainer,
  },
  bodyContainer: {
    backgroundColor: theme.color.backgroundPrimary,
    color: theme.color.textPrimary,
    flex: 1,
    overflow: 'auto',
    padding: theme.spacing.medium,
  },
}));

const App = ({ body, header }) => (
  <section style={styles.container}>
    {header()}
    <section style={styles.bodyContainer}>{body()}</section>
  </section>
);

App.propTypes = {
  body: PropTypes.func.isRequired,
  header: PropTypes.func.isRequired,
};

export default App;
