// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite/no-important';

// theme
import { createStylesheet, convertToStyleValue } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    separator: {
      border: 0,
      borderBottom: `1px solid ${theme.color.white[600]}`,
      margin: `${theme.spacing.large}px auto ${theme.spacing.base}px`,
      width: '100%',
    },
  })),
);

const Separator = props => {
  const { style } = props;
  return <hr className={classnames(css(styles.separator))} style={convertToStyleValue(style)} />;
};

Separator.propTypes = {
  style: PropTypes.object,
};

Separator.defaultProps = {
  style: {},
};

export default Separator;
