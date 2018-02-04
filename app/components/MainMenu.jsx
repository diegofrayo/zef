// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = StyleSheet.create(createStylesheet(theme => ({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    transform: `translateX(-${theme.maxWidthContainer}px)`,
    transition: 'all .3s linear',
    width: '100%',
    willChange: 'transform',
  },
  containerVisible: {
    transform: 'translateX(-0px)',
  },
  containerInner: {
    backgroundColor: theme.color.white[200],
    height: '100%',
    width: '90%',
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

const MainMenu = (props) => (
  <section id="main-menu-container" className={css(styles.container, props.isMenuOpen ? styles.containerVisible : false)} onClick={props.openMenu}>
    <div className={css(styles.containerInner)}>
      <ul className={css(styles.menu)}>
        <li className={css(styles.menuHeader)}>ZEF App</li>
        <li className={css(styles.menuItem)} onClick={props.openMenu}>
          <i className="material-icons">keyboard_arrow_right</i> <span>Inicio</span>
        </li>
        <li className={css(styles.menuItem)} onClick={props.openMenu}>
          <i className="material-icons">keyboard_arrow_right</i> <span>¿Cómo reciclar?</span>
        </li>
        <li className={css(styles.menuItem)} onClick={props.openMenu}>
          <i className="material-icons">keyboard_arrow_right</i> <span>¿En dónde puedo reciclar?</span>
        </li>
        <li className={css(styles.menuItem)} onClick={props.openMenu}>
          <i className="material-icons">keyboard_arrow_right</i> <span>Contácto</span>
        </li>
      </ul>
    </div>
  </section>
);

MainMenu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  openMenu: PropTypes.func.isRequired,
};

export default MainMenu;
