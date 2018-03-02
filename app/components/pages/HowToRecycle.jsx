// npm libs
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

// components
import Heading from 'components/common/Heading';
import Text from 'components/common/Text';

// services
import UtilitiesService from 'services/Utilities';

// theme
import { createStylesheet } from 'styles/createStylesheet';

const styles = StyleSheet.create(createStylesheet(theme => ({})));

class HowToRecycle extends React.Component {
  pageTitle = '¿Cómo reciclar?';

  componentDidMount() {
    UtilitiesService.updateAppTitle(APP_SETTINGS.APP_TITLE, this.pageTitle);
  }

  render() {
    return [
      <Heading key="page-title" size="large" tag="h2">
        {this.pageTitle}
      </Heading>,

      <Text key="page-description">
        Descripción
      </Text>,
    ];
  }
}

export default HowToRecycle;
