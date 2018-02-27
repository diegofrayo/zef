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
      color: theme.color.titles,
      marginBottom: theme.spacing.base,
    },
  })),
);

const Heading = props => {
  const { tag: Tag, className, style } = props;
  return (
    <Tag className={classnames(css(styles.tag), className)} style={style}>
      {props.children()}
    </Tag>
  );
};

Heading.propTypes = {
  children: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

Heading.defaultProps = {
  className: '',
  style: {},
};

export default Heading;
