// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite/no-important';

// theme
import {
  createStylesheet,
  convertToStyleValue,
  createFontSizeMapping1,
  createFontSizeMapping2,
  theme as appTheme,
} from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    icon: {
      fontWeight: theme.fontWeight.bold,
      marginRight: theme.spacing.small,
    },
    notFound: {
      border: '1px solid black',
      borderRadius: '100%',
      color: 'black',
      fontSize: 10,
      fontStyle: 'normal',
      padding: '3px 6px',
    },

    ...createFontSizeMapping1(theme),
  })),
);

const sizeMapping = {
  ...createFontSizeMapping2(appTheme),
  '': '',
};

const iconMapping = {
  app: 'fa-leaf',
  close: 'fa-times',
  'email-1': 'fa-at',
  'email-2': 'fa-envelope',
  facebook: 'fa-facebook',
  info: 'fa-info-circle',
  map: 'fa-map-marker',
  menu: 'fa-bars',
  phone: 'fa-phone',
  rowRight: 'fa-angle-right',
  rowUp: 'fa-angle-up',
  url: 'fa-link',
};

const Icon = props => {
  const { className, style, size, iconName, onClick } = props;
  if (!iconMapping[iconName]) return <i className={css(styles.notFound)}>?</i>;
  return (
    <i
      className={classnames(
        css(styles.icon),
        css(styles[size]),
        className,
        `fa ${iconMapping[iconName]}`,
      )}
      style={convertToStyleValue(style)}
      onClick={onClick}
    >
      {''}
    </i>
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  iconName: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(sizeMapping)),
  style: PropTypes.object,

  onClick: PropTypes.func,
};

Icon.defaultProps = {
  className: '',
  iconName: '',
  size: '',
  style: {},

  onClick: () => {},
};

export default Icon;
