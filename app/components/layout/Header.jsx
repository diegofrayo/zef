// npm libs
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

// components
import Box from 'components/common/Box';
import Heading from 'components/common/Heading';
import Icon from 'components/common/Icon';
import MainMenu from 'components/layout/MainMenu';
import ReactComponent from 'lib/Component';

// routing
import { goTo, routes } from 'routing';

// theme
import { createStylesheet } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    container: {
      backgroundColor: theme.color.brandPrimary,
      boxShadow: theme.shadow.base(theme.color.white[200]),
      flex: 0,
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
      cursor: 'pointer',
      fontWeight: theme.fontWeight.bold,
      marginBottom: 0,
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
      <Box tag="header" className={css(properties.styles.container)} valign halign>
        <Icon
          iconName="menu"
          className={css(properties.styles.menuIcon)}
          onClick={events.onClickOpenMenu(setState)}
        />

        <Heading size="xlarge" style={properties.styles.appTitle} onClick={() => goTo(routes.HOME)}>
          <Icon iconName="app" />
          <span>{APP_SETTINGS.APP_TITLE}</span>
        </Heading>

        <MainMenu
          isMenuOpen={state.isMenuOpen}
          onClickOpenMenu={events.onClickOpenMenu(setState)}
        />
      </Box>
    )}
  </ReactComponent>
);

export default Header;
