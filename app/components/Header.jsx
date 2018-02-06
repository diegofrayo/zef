// npm libs
import React from 'react';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite';

// components
import MainMenu from 'components/MainMenu';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = StyleSheet.create(createStylesheet(theme => ({
  container: {
    alignItems: 'center',
    backgroundColor: theme.color.brandPrimary.base,
    color: theme.color.white[700],
    display: 'flex',
    flex: 0,
    fontWeight: theme.fontWeight.bold,
    justifyContent: 'center',
    minHeight: theme.headerHeight,
  },
  menuIcon: {
    cursor: 'pointer',
    fontSize: 28,
    left: 10,
    position: 'absolute',
    top: 10,
  },
  text: {
    fontSize: theme.fontSize.large,
  },
})));

class Header extends React.Component {

  state = {
    isMenuOpen: false,
  };

  onClickOpenMenu = () => {
    this.setState((state) => ({
      isMenuOpen: !state.isMenuOpen,
    }));
  };

  render() {
    return (
      <header className={css(styles.container)}>
        <i className={classnames(css(styles.menuIcon), 'material-icons')} onClick={this.onClickOpenMenu}>menu</i>
        <h1 className={css(styles.text)}>ZEF</h1>
        <MainMenu isMenuOpen={this.state.isMenuOpen} onClickOpenMenu={this.onClickOpenMenu} />
      </header>
    );
  }

}

export default Header;
