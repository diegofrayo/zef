// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

// components
import Box from 'components/common/Box';
import Text from 'components/common/Text';

// services
import UtilitiesService from 'services/Utilities';

// theme
import { createStylesheet } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    indicatorsContainer: {
      justifyContent: 'space-around',
    },
    indicatorContainer: {
      boxShadow: theme.shadow.base(),
      margin: theme.spacing.base,
      maxHeight: 200,
      maxWidth: 200,
      padding: theme.spacing.large,
    },
    indicatorNumber: {
      color: theme.color.black[700],
      fontSize: theme.fontSize.xlarge * 3,
      fontWeight: theme.fontWeight.bold,
    },
    indicatorDescription: {
      fontSize: theme.fontSize.base,
      fontWeight: theme.fontWeight.bold,
    },
  })),
);

const Indicator = ({ number, description }) => (
  <Box className={css(styles.indicatorContainer)} valign halign column>
    <Text style={styles.indicatorNumber}>+{number}</Text>
    <Text className={css(styles.indicatorDescription)}>{description}</Text>
  </Box>
);

Indicator.propTypes = {
  number: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

class Home extends React.Component {
  pageTitle = 'Inicio';

  indicators = [
    {
      key: 'indicator-1',
      number: '500',
      description: 'Tapas recicladas',
    },
    {
      key: 'indicator-2',
      number: '200',
      description: 'Botellas recicladas',
    },
    {
      key: 'indicator-3',
      number: '700',
      description: 'Latas recicladas',
    },
  ];

  componentDidMount() {
    UtilitiesService.updateAppTitle(APP_SETTINGS.APP_TITLE, this.pageTitle);
  }

  render() {
    return (
      <Box pageContainer grow column>
        <Box className={css(styles.indicatorsContainer)} row>
          {this.indicators.map(indicator => <Indicator {...indicator} />)}
        </Box>
      </Box>
    );
  }
}

export default Home;
