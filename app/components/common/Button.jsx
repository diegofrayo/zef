// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite/no-important';

// theme
import { createStylesheet, convertToStyleValue } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(() => ({
    button: {},
  })),
);

const Button = props => {
  const { className, children, style, onClick } = props;
  return (
    <button
      type="button"
      className={classnames(css(styles.button), className)}
      style={convertToStyleValue(style)}
      onClick={onClick}
    >
      {children.length ? React.Children.map(children, child => child) : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,

  className: PropTypes.string,
  style: PropTypes.object,

  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  className: '',
  style: {},
};

export default Button;
