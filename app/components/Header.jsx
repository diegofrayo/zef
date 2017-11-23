// npm libs
import React from 'react';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = createStylesheet(() => ({
  container: {
    alignItems: 'center',
    backgroundColor: '#111',
    color: '#999',
    display: 'flex',
    flex: 0,
    minHeight: 50,
    padding: '0 15px',
  },
}));

const Header = () => <header style={styles.container}>Header</header>;

export default Header;
