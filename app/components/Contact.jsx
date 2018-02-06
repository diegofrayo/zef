// npm libs
import React from 'react';
import { StyleSheet, css } from 'aphrodite';

// utils
import UtilitiesService from 'utils/utilities';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = StyleSheet.create(createStylesheet(theme => ({
  text: {
    fontSize: theme.fontSize.base,
  },
})));

class Contact extends React.Component {

  componentDidMount() {
    UtilitiesService.updateAppTitle(APP_SETTINGS.APP_TITLE, 'Contácto');
  }

  render() {
    return <section className={css(styles.text)}>Acerca de ésta aplicación</section>;
  }

}

export default Contact;
