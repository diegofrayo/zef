// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { history } from 'state';

// constants
import { routes } from 'constants/index';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = StyleSheet.create(createStylesheet(theme => ({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
    backgroundColor: theme.color.white[200],
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    transform: `translateX(-${theme.maxWidthContainer}px)`,
    transition: 'all .3s linear',
    width: '90%',
    willChange: 'transform',
  },
  containerVisible: {
    transform: 'translateX(0px)',
  },
  menu: {
    margin: 0,
    padding: 0,
  },
  menuHeader: {
    backgroundColor: theme.color.white[500],
    color: theme.color.black[100],
    cursor: 'default',
    fontSize: theme.fontSize.xlarge,
    fontWeight: theme.fontWeight.bold,
    padding: '30px 10px',
    textAlign: 'center',
  },
  menuItem: {
    borderBottom: `1px solid ${theme.color.white[300]}`,
    color: theme.color.textPrimary.base,
    cursor: 'pointer',
    padding: `${theme.spacing.normal}px`,
  },
})));

const menuItemClick = (openMenu, route) => (event) => {
  history.push(route);
  openMenu(event);
};

const MainMenu = props => [
  <div
    className={css(styles.backdrop, props.isMenuOpen ? styles.backdropVisible : false)}
    onClick={props.openMenu}
    key="backdrop"
  >
    {''}
  </div>,
  <section
    className={css(styles.container, props.isMenuOpen ? styles.containerVisible : false)}
    key="menu-container"
  >
    <ul className={css(styles.menu)}>
      <li className={css(styles.menuHeader)}>ZEF App</li>
      <li className={css(styles.menuItem)} onClick={menuItemClick(props.openMenu, routes.HOME)}>
        <i className="material-icons">keyboard_arrow_right</i> <span>Inicio</span>
      </li>
      <li className={css(styles.menuItem)} onClick={menuItemClick(props.openMenu, routes.HOW_TO_RECYCLE)}>
        <i className="material-icons">keyboard_arrow_right</i> <span>¿Cómo reciclar?</span>
      </li>
      <li className={css(styles.menuItem)} onClick={menuItemClick(props.openMenu, routes.RECYCLING_AGENTS)}>
        <i className="material-icons">keyboard_arrow_right</i>
        <span>¿En dónde puedo reciclar?</span>
      </li>
      <li className={css(styles.menuItem)} onClick={menuItemClick(props.openMenu, routes.CONTACT)}>
        <i className="material-icons">keyboard_arrow_right</i> <span>Contácto</span>
      </li>
    </ul>
  </section>,
];

MainMenu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  openMenu: PropTypes.func.isRequired,
};

export default MainMenu;
