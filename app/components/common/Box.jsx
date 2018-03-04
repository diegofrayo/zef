// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite/no-important';

// theme
import { createStylesheet, convertToStyleValue } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    box: {
      display: 'flex',
      flexShrink: 0,
    },
    valign: {
      alignItems: 'center',
    },
    halign: {
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    column: {
      flexDirection: 'column',
      flexWrap: 'initial',
    },
    grow: {
      flex: 1,
    },
    growH: {
      width: '100%',
    },
    growV: {
      height: '100%',
    },
    pageContainer: {
      overflow: 'auto',
      padding: `${theme.spacing.large}px ${theme.spacing.xlarge}px`,
    },
  })),
);

const Box = props => {
  const {
    children,

    column,
    grow,
    growH,
    growV,
    halign,
    pageContainer,
    row,
    valign,

    className,
    id,
    style,
    tag,
    onClick,
  } = props;
  const Tag = !tag ? 'section' : tag;
  const optionalProps = {};
  if (id) optionalProps.id = id;
  if (onClick) optionalProps.onClick = onClick;
  return (
    <Tag
      style={convertToStyleValue(style)}
      className={classnames(
        css(styles.box),
        column && css(styles.column),
        grow && css(styles.grow),
        growH && css(styles.growH),
        growV && css(styles.growV),
        row && css(styles.row),
        halign && css(column ? styles.valign : styles.halign),
        valign && css(column ? styles.halign : styles.valign),
        pageContainer && css(styles.pageContainer),
        className,
      )}
      {...optionalProps}
    >
      {children && children.length ? React.Children.map(children, child => child) : children}
    </Tag>
  );
};

Box.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),

  column: PropTypes.bool,
  grow: PropTypes.bool,
  growH: PropTypes.bool,
  growV: PropTypes.bool,
  halign: PropTypes.bool,
  pageContainer: PropTypes.bool,
  row: PropTypes.bool,
  valign: PropTypes.bool,

  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  tag: PropTypes.oneOf(['div', 'section', 'article', 'main', 'modal', 'header', '']),

  onClick: PropTypes.func,
};

Box.defaultProps = {
  children: null,

  column: false,
  grow: false,
  growH: false,
  growV: false,
  halign: false,
  pageContainer: false,
  row: false,
  valign: false,

  id: '',
  className: '',
  style: {},
  tag: '',
  onClick: () => {},
};

export default Box;
