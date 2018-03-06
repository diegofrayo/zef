// npm libs
import React from 'react';

// components
import Box from 'components/common/Box';
import Heading from 'components/common/Heading';
import Icon from 'components/common/Icon';
import Link from 'components/common/Link';
import Text from 'components/common/Text';

// services
import UtilitiesService from 'services/Utilities';

class Contact extends React.Component {
  pageTitle = 'Contácto';

  componentDidMount() {
    UtilitiesService.updateAppTitle(APP_SETTINGS.APP_TITLE, this.pageTitle);
  }

  render() {
    return (
      <Box pageContainer grow column>
        <Heading size="large" tag="h2">
          {this.pageTitle}
        </Heading>

        <Text size="normal">Correo electrónico de contácto</Text>

        <Link href={`mailto:diegofrayo@gmail.com`} underline>
          <Icon iconName="email-2" size="large" />
          <span>diegofrayo@gmail.com</span>
        </Link>
      </Box>
    );
  }
}

export default Contact;
