// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite/no-important';

// components
import Box from 'components/common/Box';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

// theme
import { createStylesheet } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: 'none',
      height: '100vh',
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
      padding: `${theme.spacing.large}px 0`,
    },
  })),
);

const Modal = props => {
  const { header, body, data, show, onClickHideModal } = props;
  return ReactDOM.createPortal(
    <Box
      key="modal-backdrop"
      className={css(styles.backdrop, show && styles.backdropVisible)}
      onClick={onClickHideModal}
      valign
      halign
    >
      <Box
        key="modal-container"
        className={css(styles.container)}
        tag="article"
        onClick={event => event.stopPropagation()}
        column
      >
        <Box tag="header" className={css(styles.header)}>
          {header(data)}
        </Box>
        <Box className={css(styles.body)} column>
          {body(data)}
        </Box>
        <Button className={css(styles.closeButton)} onClick={onClickHideModal}>
          <Icon iconName="close" />
        </Button>
      </Box>
    </Box>,
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
