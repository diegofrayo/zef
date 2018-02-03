// npm libs
import React from 'react';
import { StyleSheet, css } from 'aphrodite';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = StyleSheet.create(createStylesheet(theme => ({
  container: {
    alignItems: 'center',
    backgroundColor: theme.color.brandPrimary.base,
    color: theme.color.textSecondary.base,
    display: 'flex',
    flex: 0,
    minHeight: theme.headerHeight,
    padding: `0 ${theme.spacing.medium}px`,
  },
})));

const Header = () => <header className={css(styles.container)}>ZEF</header>;

export default Header;
