// npm libs
import React from 'react';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite';

// components
import MainMenu from 'components/MainMenu';

// theme
import { createStylesheet } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    container: {
      alignItems: 'center',
      backgroundColor: theme.color.brandPrimary,
      boxShadow: theme.shadow.base(theme.color.white[200]),
      color: theme.color.white[700],
      display: 'flex',
      flex: 0,
      fontWeight: theme.fontWeight.bold,
      justifyContent: 'center',
      minHeight: theme.headerHeight,
      zIndex: 100,
      [theme.mediaQueries.mobile.css]: {
        minHeight: theme.headerHeight - 20,
      },
    },
    menuIcon: {
      cursor: 'pointer',
      fontSize: 28,
      left: 20,
      position: 'absolute',
      top: 22,
      [theme.mediaQueries.mobile.css]: {
        left: 10,
        top: 12,
      },
    },
    appTitle: {
      fontSize: theme.fontSize.large,
    },
    appIcon: {
      fontSize: theme.fontSize.large,
      marginRight: theme.spacing.small,
    },
  })),
);

class Header extends React.Component {

  state = {
    isMenuOpen: false,
  };

  onClickOpenMenu = () => {
    this.setState(state => ({
      isMenuOpen: !state.isMenuOpen,
    }));
  };

  render() {
    return (
      <header className={css(styles.container)}>
        <i
          className={classnames(css(styles.menuIcon), 'material-icons')}
          onClick={this.onClickOpenMenu}
        >
          menu
        </i>
        <h1 className={css(styles.text)}>
          <i className={classnames(css(styles.appIcon), 'fa fa-trophy')}>{''}</i>
          <span>{APP_SETTINGS.APP_TITLE}</span>
        </h1>
        <MainMenu isMenuOpen={this.state.isMenuOpen} onClickOpenMenu={this.onClickOpenMenu} />
      </header>
    );
  }
}

export default Header;
