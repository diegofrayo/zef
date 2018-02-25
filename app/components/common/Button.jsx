// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite';

// theme
import { createStylesheet } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    tag: {},
  })),
);

const Button = props => {
  const { className } = props;
  return (
    <button type="button" className={classnames(css(styles.tag), className)}>
      {props.children()}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

export default Button;
