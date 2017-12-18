// npm libs
import React from 'react';
import PropTypes from 'prop-types';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = createStylesheet(theme => ({
  container: {
    backgroundColor: theme.color.backgroundPrimary.base,
    borderRadius: 5,
    boxShadow: '0px 0px 10px 1px rgb(202, 202, 202)',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    margin: ' 0 auto',
    maxWidth: theme.maxWidthContainer,
    overflow: 'hidden',
  },
  bodyContainer: {
    backgroundColor: theme.color.backgroundPrimary.base,
    color: theme.color.textPrimary.base,
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
