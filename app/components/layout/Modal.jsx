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
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'none',
      height: '100%',
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
      boxShadow: theme.shadow.base(theme.color.black[700]),
      height: '100%',
      maxHeight: 400,
      maxWidth: 400,
      overflow: 'auto',
      position: 'relative',
      width: '100%',
    },
    closeButton: {
      color: theme.color.white[400],
      fontSize: theme.fontSize.large * 1.5,
      position: 'absolute',
      right: theme.spacing.base,
      top: 0,
    },
  })),
);

const Modal = props =>
  ReactDOM.createPortal(
    <div
      className={css(styles.backdrop, props.show ? styles.backdropVisible : false)}
      onClick={props.onClickHideModal}
      key="backdrop"
    >
      <section
        className={css(styles.container)}
        key="modal-container"
      >
        <button className={css(styles.closeButton)} onClick={props.onClickHideModal} type="button">
          <i className={'fa fa-times'}>{''}</i>
        </button>
        <h2 className={css(styles.title)}>{props.elementInfo.label}</h2>
        {props.elementInfo.images.map((url, index) => <img key={`modal-img-${props.elementInfo.id}-${index}`} src={url} alt={props.elementInfo.label} className={css(styles.image)} />)}
        <p className={css(styles.description)}>{props.elementInfo.description}</p>
      </section>
    </div>,
    document.getElementById('main-container'),
  );

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClickHideModal: PropTypes.func.isRequired,
  elementInfo: PropTypes.object.isRequired,
};

export default Modal;
