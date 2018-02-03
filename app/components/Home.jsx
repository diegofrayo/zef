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
  placeName: {
    marginBottom: theme.spacing.small,
    fontSize: theme.fontSize.large
  },
  text: {
    marginBottom: theme.spacing.small,
  },
  placeAddress: {},
  placePhone: {},
  placeEmail: {
    color: 'blue',
  },
  placeWebsite: {
    color: 'blue',
  },
}));

class Home extends React.Component {

  state = {
    places: [1, 2, 3, 4, 5].map(item => ({
      id: `key-${item}`,
      name: `Name ${item}`,
      address: `Address ${item}`,
      phone: '311 654 7896',
      email: `email${item}@domain.co`,
      website: `https://fb.com/name-${item}`
    })),
  };

  renderItem = place => (
    <article style={styles.placeContainer} key={place.id}>
      <h1 style={styles.placeName}>{place.name}</h1>
      <p style={styles.placeAddress}>Dirección: {place.address}</p>
      <p style={styles.placePhone}>Teléfono: {place.phone}</p>
      <p>Email: <span style={styles.placeEmail}>{place.email}</span></p>
      <p>
        Sitio web: <a style={place.placeWebsite} href={place.website} target="_blank" rel="noopener noreferrer">
          {place.website}
        </a>
      </p>
    </article>
  );

  render() {
    return <section>{this.state.places.map(this.renderItem)}</section>;
  }
}

export default Home;
