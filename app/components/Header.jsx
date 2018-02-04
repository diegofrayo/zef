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
    color: theme.color.textSecondary.primary,
    display: 'flex',
    flex: 0,
    fontWeight: theme.fontWeight.bold,
    minHeight: theme.headerHeight,
    padding: `0 ${theme.spacing.medium}px`,
  },
  menuIcon: {
    cursor: 'pointer',
    marginRight: theme.spacing.base,
  },
})));

class Header extends React.Component {

  state = {
    isMenuOpen: false,
  };

  openMenu = (event) => {
    event.stopPropagation();
    this.setState((state, props) => ({
      isMenuOpen: !state.isMenuOpen,
    }));
  };

  render() {
    return (
      <header className={css(styles.container)}>
        <i className={classnames(css(styles.menuIcon), 'material-icons')} onClick={this.openMenu}>menu</i> <span className="u-csr-default">ZEF</span>
        <MainMenu isMenuOpen={this.state.isMenuOpen} openMenu={this.openMenu} />
      </header>
    );
  }

}

export default Header;
