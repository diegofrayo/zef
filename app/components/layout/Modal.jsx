// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite';

// theme
import { createStylesheet } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    backdrop: {
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: 'none',
      height: '100vh',
      justifyContent: 'center',
      left: 0,
      padding: 10,
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: 300,
    },
    backdropVisible: {
      display: 'flex',
    },
    container: {
      backgroundColor: theme.color.white[700],
      boxShadow: '0 0 50px 0 #555',
      height: '100%',
      maxHeight: 500,
      maxWidth: 500,
      overflow: 'auto',
      padding: theme.spacing.large,
      position: 'relative',
      width: '100%',
      zIndex: 400,
    },
    closeButton: {
      color: theme.color.white[400],
      fontSize: theme.fontSize.large * 1.5,
      position: 'absolute',
      right: theme.spacing.base,
      top: 0,
    },
    header: {
      borderBottom: `1px solid ${theme.color.white[600]}`,
      padding: `${theme.spacing.large}px ${theme.spacing.base}px ${theme.spacing.base}px`,
    },
    body: {
      padding: `${theme.spacing.large}px`,
    },
  })),
);

const Modal = props => {
  const { header, body, data, show, onClickHideModal } = props;
  return ReactDOM.createPortal(
    <div
      key="modal-backdrop"
      className={css(styles.backdrop, show ? styles.backdropVisible : false)}
      onClick={onClickHideModal}
    >
      <article
        key="modal-container"
        className={css(styles.container)}
        onClick={event => event.stopPropagation()}
      >
        <header className={css(styles.header)}>{header(data)}</header>
        <section className={css(styles.body)}>{body(data)}</section>
        <button className={css(styles.closeButton)} onClick={onClickHideModal} type="button">
          <i className={'fa fa-times'}>{''}</i>
        </button>
      </article>
    </div>,
    document.getElementById('main-container'),
  );
};

Modal.propTypes = {
  header: PropTypes.func,
  body: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClickHideModal: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  header: () => {},
};

export default Modal;
