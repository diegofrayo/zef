// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

// components
import Box from 'components/common/Box';
import Icon from 'components/common/Icon';

// routing
import { goTo, routes } from 'routing';

// theme
import { createStylesheet } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'none',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
    },
    backdropVisible: {
      display: 'block',
    },
    container: {
      backgroundColor: theme.color.white[700],
      boxShadow: theme.shadow.base(theme.color.black[700]),
      height: '100%',
      left: 0,
      maxWidth: 280,
      overflow: 'auto',
      position: 'absolute',
      top: 0,
      transform: `translateX(-${theme.maxWidthContainer}px)`,
      transition: 'all .3s linear',
      width: '90%',
      willChange: 'transform',
      zIndex: 200,
    },
    containerVisible: {
      transform: 'translateX(0px)',
    },

    menu: {
      margin: 0,
      padding: 0,
      width: '100%',
    },
    menuHeader: {
      borderBottom: `1px solid ${theme.color.white[600]}`,
      color: theme.color.black[700],
      cursor: 'default',
      fontSize: theme.fontSize.xlarge,
      fontWeight: theme.fontWeight.bold,
      marginBottom: theme.spacing.base,
      padding: `${theme.spacing.large}px ${theme.spacing.base}px`,
      textAlign: 'center',
    },
    menuHeaderIcon: {
      marginRight: theme.spacing.base,
    },
    menuItem: {
      color: theme.color.black[400],
      cursor: 'pointer',
      fontSize: theme.fontSize.small,
      fontWeight: theme.fontWeight.normal,
      padding: `${theme.spacing.medium}px ${theme.spacing.large}px`,
    },
  })),
);

const onClickMenuItem = (onClickOpenMenu, route) => () => {
  goTo(route);
  onClickOpenMenu();
};

const menuItems = [
  {
    name: 'Inicio',
    route: routes.HOME,
  },
  {
    name: '¿En dónde puedo reciclar?',
    route: routes.RECYCLING_AGENTS,
  },
];

const MainMenu = props => [
  <Box
    key="backdrop"
    tag="div"
    className={css(styles.backdrop, props.isMenuOpen && styles.backdropVisible)}
    onClick={props.onClickOpenMenu}
  >
    {''}
  </Box>,
  <Box
    key="menu-container"
    className={css(styles.container, props.isMenuOpen ? styles.containerVisible : false)}
  >
    <ul className={css(styles.menu)}>
      <li className={css(styles.menuHeader)}>
        <Icon iconName="app" style={styles.menuHeaderIcon} />
        <span>{APP_SETTINGS.APP_TITLE}</span>
      </li>
      {menuItems.map(item => (
        <li
          key={`menu-item-${item.route}`}
          className={css(styles.menuItem)}
          onClick={onClickMenuItem(props.onClickOpenMenu, item.route)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  </Box>,
];

MainMenu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  onClickOpenMenu: PropTypes.func.isRequired,
};

export default MainMenu;
