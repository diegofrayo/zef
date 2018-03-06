// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite/no-important';

// theme
import { createStylesheet, convertToStyleValue, theme as appTheme } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    separator: {
      border: 0,
      borderBottom: `1px solid ${theme.color.white[600]}`,
      width: '100%',
    },
  })),
);

const Separator = props => {
  const { marginTop, marginBottom, style } = props;
  return (
    <hr
      className={classnames(css(styles.separator))}
      style={Object.assign({}, convertToStyleValue(style), { marginTop, marginBottom })}
    />
  );
};

Separator.propTypes = {
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  style: PropTypes.object,
};

Separator.defaultProps = {
  marginTop: appTheme.spacing.large,
  marginBottom: appTheme.spacing.base,
  style: {},
};

export default Separator;
