// npm libs
import React from 'react';
import { StyleSheet, css } from 'aphrodite';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = StyleSheet.create(createStylesheet(theme => ({})));

class Contact extends React.Component {

  constructor() {
    super();
    document.title = `${document.title} - Contácto`;
  }

  render() {
    return <section>Acerca de ésta aplicación</section>;
  }

}

export default Contact;
