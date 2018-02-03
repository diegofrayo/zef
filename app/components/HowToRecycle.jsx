// npm libs
import React from 'react';
import { StyleSheet, css } from 'aphrodite';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = StyleSheet.create(createStylesheet(theme => ({})));

class HowToRecycle extends React.Component {

  constructor() {
    super();
    document.title = `${document.title} - ¿Cómo reciclar?`;
  }

  render() {
    return <section>¿Cómo reciclar?</section>;
  }

}

export default HowToRecycle;
