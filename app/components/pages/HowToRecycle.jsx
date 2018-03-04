// npm libs
import React from 'react';
// import { StyleSheet, css } from 'aphrodite/no-important';

// components
import Box from 'components/common/Box';
import Heading from 'components/common/Heading';
import Text from 'components/common/Text';

// theme
// import { createStylesheet } from 'styles/createStylesheet';

// services
import UtilitiesService from 'services/Utilities';

// const styles = StyleSheet.create(createStylesheet(theme => ({})));

class HowToRecycle extends React.Component {
  pageTitle = '¿Cómo reciclar?';

  componentDidMount() {
    UtilitiesService.updateAppTitle(APP_SETTINGS.APP_TITLE, this.pageTitle);
  }

  render() {
    return (
      <Box pageContainer grow column>
        <Heading key="page-title" size="large" tag="h2">
          {this.pageTitle}
        </Heading>

        <Text key="page-description">
          Descripción
        </Text>
      </Box>
    );
  }
}

export default HowToRecycle;
