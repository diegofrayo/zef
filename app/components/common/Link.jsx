// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite/no-important';

// theme
import { createStylesheet, convertToStyleValue } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(() => ({
    link: {},

    underline: {
      textDecoration: 'underline',
    },
  })),
);

const Link = props => {
  const { className, href, children, style, target, underline } = props;
  return (
    <a
      href={href}
      className={classnames(css(styles.link), underline && css(styles.underline), className)}
      rel="noopener noreferrer"
      style={convertToStyleValue(style)}
      target={target}
    >
      {children.length ? React.Children.map(children, child => child) : children}
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,

  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  style: PropTypes.object,
  target: PropTypes.string,
  underline: PropTypes.bool,
};

Link.defaultProps = {
  className: '',
  style: {},
  target: '',
  underline: false,
};

export default Link;
