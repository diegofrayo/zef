// npm libs
import React from 'react';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = createStylesheet(theme => ({
  container: {
    alignItems: 'center',
    backgroundColor: theme.color.backgroundSecondary,
    color: theme.color.textSecondary,
    display: 'flex',
    flex: 0,
    minHeight: theme.headerHeight,
    padding: `0 ${theme.spacing.medium}px`,
  },
}));

const Header = () => <header style={styles.container}>App Name</header>;

export default Header;
