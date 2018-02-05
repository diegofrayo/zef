// npm libs
import React from 'react';
import { StyleSheet, css } from 'aphrodite';

// utils
import UtilitiesService from 'utils/utilities';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = StyleSheet.create(createStylesheet(theme => ({})));

class HowToRecycle extends React.Component {

  componentDidMount() {
    UtilitiesService.updateAppTitle(APP_SETTINGS.APP_TITLE, '¿Cómo reciclar?');
  }

  render() {
    return <section>¿Cómo reciclar?</section>;
  }

}

export default HowToRecycle;
