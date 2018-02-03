// npm libs
import React from 'react';
import { StyleSheet, css } from 'aphrodite';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = StyleSheet.create(createStylesheet(theme => ({
  placeContainer: {
    backgroundColor: theme.color.white[200],
    marginBottom: theme.spacing.base,
    padding: theme.spacing.base,
  },
  placeName: {
    marginBottom: theme.spacing.normal,
    fontSize: theme.fontSize.large,
  },
  textContainer: {
    marginBottom: theme.spacing.small,
  },
  label: {
    fontWeight: theme.fontWeight.bold,
  },
  placeEmail: {
    color: theme.color.blue[400],
  },
  placeWebsite: {
    color: theme.color.blue[400],
  },
})));

class RecyclingAgents extends React.Component {

  constructor() {
    super();
    document.title = `${document.title} - ¿En dónde puedo reciclar?`;
  }

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
    <article className={css(styles.placeContainer)} key={place.id}>
      <h1 className={css(styles.placeName)}>{place.name}</h1>
      <div className={css(styles.textContainer)}>
        <span className={css(styles.label)}>Dirección: </span>
        <span>{place.address}</span>
      </div>
      <div className={css(styles.textContainer)}>
        <span className={css(styles.label)}>Teléfono: </span>
        <span>{place.phone}</span>
      </div>
      <div className={css(styles.textContainer)}>
        <span className={css(styles.label)}>Email: </span>
        <span className={css(styles.placeEmail)}>{place.email}</span>
      </div>
      <div className={css(styles.textContainer)}>
        <span className={css(styles.label)}>Sitio web: </span>{' '}
        <a
          className={css(styles.placeWebsite)}
          href={place.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {place.website}
        </a>
      </div>
    </article>
  );

  render() {
    // <p>A estos sitios puedes llevar los elementos que has reciclado.</p>
    return (
      <section>{this.state.places.map(this.renderItem)}</section>
    );
  }
}

export default RecyclingAgents;
