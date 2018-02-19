// npm libs
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { history } from 'state';

// routing
import { routes } from 'routing';

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
  history.push(route);
  onClickOpenMenu();
};

const MainMenu = props => [
  <div
    className={css(styles.backdrop, props.isMenuOpen ? styles.backdropVisible : false)}
    onClick={props.onClickOpenMenu}
    key="backdrop"
  >
    {''}
  </div>,
  <section
    className={css(styles.container, props.isMenuOpen ? styles.containerVisible : false)}
    key="menu-container"
  >
    <ul className={css(styles.menu)}>
      <li className={css(styles.menuHeader)}>
        <i className={classnames('fa fa-trophy', css(styles.menuHeaderIcon))}>{''}</i>
        <span>{APP_SETTINGS.APP_TITLE}</span>
      </li>
      <li
        className={css(styles.menuItem)}
        onClick={onClickMenuItem(props.onClickOpenMenu, routes.HOME)}
      >
        Inicio
      </li>
      <li
        className={css(styles.menuItem)}
        onClick={onClickMenuItem(props.onClickOpenMenu, routes.HOW_TO_RECYCLE)}
      >
        ¿Cómo reciclar?
      </li>
      <li
        className={css(styles.menuItem)}
        onClick={onClickMenuItem(props.onClickOpenMenu, routes.RECYCLING_AGENTS)}
      >
        ¿En dónde puedo reciclar?
      </li>
      <li
        className={css(styles.menuItem)}
        onClick={onClickMenuItem(props.onClickOpenMenu, routes.PROJECTS)}
      >
        Proyectos
      </li>
      <li
        className={css(styles.menuItem)}
        onClick={onClickMenuItem(props.onClickOpenMenu, routes.STATISTICS)}
      >
        Estadísticas
      </li>
      <li
        className={css(styles.menuItem)}
        onClick={onClickMenuItem(props.onClickOpenMenu, routes.CONTACT)}
      >
        Contácto
      </li>
    </ul>
  </section>,
];

MainMenu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  onClickOpenMenu: PropTypes.func.isRequired,
};

export default MainMenu;
