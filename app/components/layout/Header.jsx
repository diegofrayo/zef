// npm libs
import React from 'react';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite/no-important';

// components
import Heading from 'components/common/Heading';
import MainMenu from 'components/layout/MainMenu';
import ReactComponent from 'lib/Component';

// theme
import { createStylesheet, convertToStyleValue } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    container: {
      alignItems: 'center',
      backgroundColor: theme.color.brandPrimary,
      boxShadow: theme.shadow.base(theme.color.white[200]),
      display: 'flex',
      flex: 0,
      justifyContent: 'center',
      minHeight: theme.headerHeight,
      zIndex: 100,
      [theme.mediaQueries.mobile.css]: {
        minHeight: theme.headerHeight - 20,
      },
    },
    menuIcon: {
      color: theme.color.white[700],
      cursor: 'pointer',
      fontSize: 28,
      left: 20,
      position: 'absolute',
      top: 22,
      [theme.mediaQueries.mobile.css]: {
        fontSize: 24,
        left: 10,
        top: 14,
      },
    },
    appTitle: {
      color: theme.color.white[700],
      fontWeight: theme.fontWeight.bold,
      marginBottom: 0,
    },
    appIcon: {
      marginRight: theme.spacing.small,
    },
  })),
);

const Header = () => (
  <ReactComponent
    state={{ isMenuOpen: false }}
    properties={{ styles }}
    events={{
      onClickOpenMenu: setState => () => {
        setState(state => ({
          isMenuOpen: !state.isMenuOpen,
        }));
      },
    }}
  >
    {(state, events, properties, setState) => (
      <header className={css(properties.styles.container)}>
        <i
          className={classnames('fa fa-bars', css(properties.styles.menuIcon))}
          onClick={events.onClickOpenMenu(setState)}
        >
          {''}
        </i>

        <Heading
          size="large"
          style={convertToStyleValue(properties.styles.appTitle)}
        >
          <i className={classnames(css(properties.styles.appIcon), 'fa fa-leaf')}>{''}</i>
          <span>{APP_SETTINGS.APP_TITLE}</span>
        </Heading>

        <MainMenu
          isMenuOpen={state.isMenuOpen}
          onClickOpenMenu={events.onClickOpenMenu(setState)}
        />
      </header>
    )}
  </ReactComponent>
);

/*
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
          className={classnames('fa fa-bars', css(styles.menuIcon))}
          onClick={this.onClickOpenMenu}
        >
          {''}
        </i>
        <h1 className={css(styles.text)}>
          <i className={classnames(css(styles.appIcon), 'fa fa-leaf')}>{''}</i>
          <span>{APP_SETTINGS.APP_TITLE}</span>
        </h1>
        <MainMenu isMenuOpen={this.state.isMenuOpen} onClickOpenMenu={this.onClickOpenMenu} />
      </header>
    );
  }
}
*/

export default Header;
