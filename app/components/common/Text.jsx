// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite/no-important';

// theme
import { createStylesheet, convertToStyleValue } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    text: {
      color: theme.color.textPrimary,
      marginBottom: theme.spacing.base,
      textAlign: 'justify',
    },
    large: {
      fontSize: theme.fontSize.large,
    },
    medium: {
      fontSize: theme.fontSize.medium,
    },
    normal: {
      fontSize: theme.fontSize.base,
    },
    small: {
      fontSize: theme.fontSize.small,
    },
    xsmall: {
      fontSize: theme.fontSize.xsmall,
    },
  })),
);

const sizeMapping = {
  large: 'large',
  medium: 'medium',
  normal: 'base',
  small: 'small',
  xsmall: 'xsmall',
  '': '',
};

const Text = props => {
  const { className, children, style, size } = props;
  return (
    <p
      className={classnames(css(styles.text), css(styles[size]), className)}
      style={convertToStyleValue(style)}
    >
      {children.length ? React.Children.map(children, child => child) : children}
    </p>
  );
};

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(sizeMapping)),
  style: PropTypes.object,
};

Text.defaultProps = {
  className: '',
  size: '',
  style: {},
};

export default Text;
