// npm libs
import React from 'react';
import { StyleSheet, css } from 'aphrodite';

// utils
import UtilitiesService from 'utils/utilities';

// theme
import { createStylesheet } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    pageTitle: {
      color: theme.color.titles,
      marginBottom: theme.spacing.base,
    },
    pageDescription: {
      color: theme.color.textPrimary,
      fontSize: theme.fontSize.base,
      marginBottom: theme.spacing.base,
      textAlign: 'justify',
    },
  })),
);

class Contact extends React.Component {

  pageTitle = 'Contácto';

  componentDidMount() {
    UtilitiesService.updateAppTitle(APP_SETTINGS.APP_TITLE, this.pageTitle);
  }

  render() {
    return [
      <h2 key="page-title" className={css(styles.pageTitle)}>
        {this.pageTitle}
      </h2>,
      <p className={css(styles.pageDescription)} key="page-description">
        Descripción
      </p>,
    ];
  }
}

export default Contact;
