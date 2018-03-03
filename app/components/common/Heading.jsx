// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite/no-important';

// theme
import { createStylesheet, convertToStyleValue } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    tag: {
      color: theme.color.titles,
      marginBottom: theme.spacing.base,
    },
    xlarge: {
      fontSize: theme.fontSize.xlarge,
    },
    large: {
      fontSize: theme.fontSize.large,
    },
    medium: {
      fontSize: theme.fontSize.medium,
    },
    small: {
      fontSize: theme.fontSize.medium - 1,
    },
  })),
);

const tagMapping = {
  xlarge: 'h1',
  large: 'h1',
  medium: 'h2',
  small: 'h3',
};

const Heading = props => {
  const { tag, className, style, children, size } = props;
  const Tag = tagMapping[size] !== undefined ? tagMapping[size] : tag;
  return (
    <Tag className={classnames(css(styles.tag), css(styles[size]), className)} style={convertToStyleValue(style)}>
      {children.length ? React.Children.map(children, child => child) : children}
    </Tag>
  );
};

Heading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(tagMapping)),
  style: PropTypes.object,
  tag: PropTypes.oneOf(Array.from(Array(6).keys()).map(index => `h${index + 1}`)),
};

Heading.defaultProps = {
  className: '',
  size: 'large',
  style: {},
  tag: 'h1',
};

export default Heading;
