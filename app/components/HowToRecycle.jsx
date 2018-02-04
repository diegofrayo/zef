// npm libs
import React from 'react';
import { StyleSheet, css } from 'aphrodite';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = StyleSheet.create(createStylesheet(theme => ({})));

class HowToRecycle extends React.Component {

  componentDidMount() {
    document.title = `ZEF - ¿Cómo reciclar?`;
  }

  render() {
    return <section>¿Cómo reciclar?</section>;
  }

}

export default HowToRecycle;
