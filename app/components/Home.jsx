// npm libs
import React from 'react';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = createStylesheet(theme => ({
  placeContainer: {
    backgroundColor: theme.color.backgroundPrimary[100],
    marginBottom: theme.spacing.base,
    padding: theme.spacing.base,
  },
  placeName: { marginBottom: theme.spacing.small, fontSize: theme.fontSize.large },
  placeAddress: {},
  placePhone: { margin: `${theme.spacing.small / 2}px 0` },
  placeEmail: {
    fontStyle: 'italic',
    color: 'blue',
  },
}));

class Home extends React.Component {
  state = {
    places: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => ({
      id: `key-${item}`,
      name: `Name ${item}`,
      address: `Address ${item}`,
      phone: '311 654 7896',
      email: `email${item}@domain.co`,
    })),
  };

  renderItem = place => (
    <article style={styles.placeContainer} key={place.id}>
      <h1 style={styles.placeName}>{place.name}</h1>
      <p style={styles.placeAddress}>{place.address}</p>
      <p style={styles.placePhone}>{place.phone}</p>
      <p style={styles.placeEmail}>{place.email}</p>
    </article>
  );

  render() {
    return <section>{this.state.places.map(this.renderItem)}</section>;
  }
}

export default Home;
