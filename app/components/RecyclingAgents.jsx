// npm libs
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import classnames from 'classnames';

// utils
import UtilitiesService from 'utils/utilities';

// theme
import createStylesheet from 'styles/createStylesheet';

const styles = StyleSheet.create(createStylesheet(theme => ({
  pageDescription: {
    fontSize: theme.fontSize.base,
    marginBottom: theme.spacing.base,
  },
  placeContainer: {
    boxShadow: '0 0 5px 1px #DDD',
    cursor: 'default',
    backgroundColor: theme.color.white[200],
    marginBottom: theme.spacing.medium,
    padding: theme.spacing.base,
  },
  textContainer: {
    marginBottom: theme.spacing.small,
  },
  textContainerDescription: {
    margin: `${theme.spacing.base}px 0`,
  },
  icon: {
    fontSize: theme.fontSize.large,
    marginRight: theme.spacing.small,
  },
  iconDescription: {
    color: theme.color.black[700],
  },
  iconLocation: {
    color: theme.color.yellow[700],
  },
  iconPhone: {
    color: theme.color.red[100],
  },
  iconEmail: {
    color: theme.color.red[100],
  },
  iconWebsite: {
    color: theme.color.white[100],
  },
  iconFacebook: {
    color: theme.color.blue[700],
  },
  placeName: {
    color: 'black',
    fontSize: theme.fontSize.medium,
  },
  placeEmail: {
    color: theme.color.blue[400],
  },
  placeWebsite: {
    color: theme.color.blue[200],
  },
})));

class RecyclingAgents extends React.Component {

  state = {
    places: require('./../../assets/data/recycling_places.json') // eslint-disable-line
  };

  componentDidMount() {
    UtilitiesService.updateAppTitle(APP_SETTINGS.APP_TITLE, '¿En dónde puedo reciclar?');
  }

  renderItem = place => (
    <article className={css(styles.placeContainer)} key={place.id}>
      <h1 className={css(styles.placeName)}>{place.name}</h1>
      {place.description && (
        <div className={classnames(css(styles.textContainer), css(styles.textContainerDescription), 'u-text-justify')}>
          <span>{place.description}</span>
        </div>
      )}
      {(place.address || place.location) && (
        <div className={css(styles.textContainer)}>
          <i className={classnames(css(styles.icon), css(styles.iconLocation), 'fa fa-map-marker')}>{''}</i>
          <span>{place.address} | {place.location}</span>
        </div>
      )}
      {place.phone && (
        <div className={css(styles.textContainer)}>
          <i className={classnames(css(styles.icon), css(styles.iconPhone), 'fa fa-phone')}>{''}</i>
          <span>{place.phone}</span>
        </div>
      )}
      {place.email && (
        <div className={css(styles.textContainer)}>
          <i className={classnames(css(styles.icon), css(styles.iconEmail), 'fa fa-at')}>{''}</i>
          <span className={css(styles.placeEmail)}>{place.email}</span>
        </div>
      )}
      {place.website && (
        <div className={css(styles.textContainer)}>
          <i className={classnames(css(styles.icon), css(styles.iconWebsite), 'fa fa-link')}>{''}</i>
          <a
            className={css(styles.placeWebsite)}
            href={place.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {place.website}
          </a>
        </div>
      )}
      {place.fb_page && (
        <div className={css(styles.textContainer)}>
          <i className={classnames(css(styles.icon), css(styles.iconFacebook), 'fa fa-facebook')}>{''}</i>
          <a
            className={css(styles.placeWebsite)}
            href={place.fb_page.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            /{place.fb_page.label}
          </a>
        </div>
      )}
    </article>
  );

  render() {
    return [
      <p className={css(styles.pageDescription)} key="description">
        A estos sitios puedes llevar los elementos que has reciclado.
      </p>,
      <br />,
      <section key="places">{this.state.places.map(this.renderItem)}</section>,
    ];
  }
}

export default RecyclingAgents;
