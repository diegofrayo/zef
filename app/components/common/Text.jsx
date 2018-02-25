// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite';

// theme
import { createStylesheet } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    tag: {
      color: theme.color.textPrimary,
      fontSize: theme.fontSize.base,
      marginBottom: theme.spacing.base * 2,
      textAlign: 'justify',
    },
  })),
);

const Text = props => {
  const { className } = props;
  return <p className={classnames(css(styles.tag), className)}>{props.children()}</p>;
};

Text.propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Text.defaultProps = {
  className: '',
};

export default Text;