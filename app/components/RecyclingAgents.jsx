// npm libs
import React from 'react';
import { Transition as CSSTransitionGroup } from 'react-transition-group';
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
    backgroundColor: theme.color.white[650],
    boxShadow: '0 0 5px 1px #DDD',
    cursor: 'default',
    marginBottom: theme.spacing.medium,
    padding: theme.spacing.base,
  },
  textContainer: {
    color: theme.color.black[700],
    marginBottom: theme.spacing.small,
  },
  textContainerDescription: {
    color: theme.color.black[500],
    margin: `${theme.spacing.base}px 0 ${theme.spacing.small}px`,
    textAlign: 'justify',
  },
  textPlaceName: {
    color: theme.color.black[700],
    fontSize: theme.fontSize.medium,
  },
  textPlaceEmail: {
    color: theme.color.blue[100],
  },
  textPlaceWebsite: {
    borderBottom: `1px solid ${theme.color.blue[100]}`,
    color: theme.color.blue[100],
    paddingBottom: 1,
  },
  tagsContainer:{
    backgroundColor: theme.color.white[600],
    fontSize: theme.fontSize.small,
    margin: `${theme.spacing.base}px 0`,
    padding: theme.spacing.base,
  },
  tag: {
    backgroundColor: theme.color.white[700],
    borderRadius: theme.spacing.small,
    color: theme.color.red[100],
    display: 'inline-block',
    fontSize: theme.fontSize.xsmall,
    fontStyle: 'italic',
    marginRight: theme.spacing.small,
    marginTop: theme.spacing.small,
    padding: `${theme.spacing.small}px ${theme.spacing.base}px`,
  },
  buttonDetails: {
    cursor: 'pointer',
    float: 'right',
    fontSize: theme.fontSize.xsmall,
    padding: theme.spacing.small,
  },
  detailsContainer: {
    clear: 'both',
    transition: 'all .3s linear',
  },
  detailsContainerHidden: {
    opacity: 0,
  },
  detailsContainerVisible: {
    opacity: 1,
    padding: theme.spacing.base,
  },
  icon: {
    fontSize: theme.fontSize.large,
    marginRight: theme.spacing.small,
  },
  iconDetails: {
    fontSize: theme.fontSize.xsmall,
  },
  iconLocation: {
    color: theme.color.orange[200],
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
    color: theme.color.blue[200],
  },
})));

class RecyclingAgents extends React.Component {

  state = {
    places: require('./../../assets/data/recycling_places.json') // eslint-disable-line
      .map((place) => ({ show_details: false, ...place })),
  };

  componentDidMount() {
    UtilitiesService.updateAppTitle(APP_SETTINGS.APP_TITLE, '¿En dónde puedo reciclar?');
  }

  onClickShowPlaceDetails = (placeSelected) => () => {
    this.setState((state) => ({
      places: state.places.map((place) => {
        if (place.id === placeSelected.id) {
          return { ...place, show_details: !placeSelected.show_details };
        }
        return place;
      }),
    }));
  };

  renderItem = place => {

    const transitionStyles = {
      entering: css(styles.detailsContainerVisible),
      entered: css(styles.detailsContainerVisible),
      exiting: css(styles.detailsContainerHidden),
      exited: css(styles.detailsContainerHidden),
    };

    return (
      <article className={css(styles.placeContainer)} key={place.id}>
        <h1 className={css(styles.textPlaceName)}>{place.name}</h1>
        {place.description && (
          <div className={classnames(css(styles.textContainerDescription))}>
            <span>{place.description}</span>
          </div>
        )}
        <section className={css(styles.tagsContainer)}>
          <p>
            A este sitio puedes llevar los estos elementos
          </p>
          {place.tags.map(this.renderTag(place.id))}
        </section>
        <button
          type="button"
          onClick={this.onClickShowPlaceDetails(place)}
          className={css(styles.buttonDetails)}
        >
          {place.show_details ? (
            <i className={classnames(css(styles.icon), css(styles.iconDetails), 'fa fa-minus')}>
              {''}
            </i>
          ) : (
            <i className={classnames(css(styles.icon), css(styles.iconDetails), 'fa fa-plus')}>
              {''}
            </i>
          )}
          Detalles
        </button>
        <CSSTransitionGroup in={place.show_details} timeout={500}>
          {state => (
            <section
              className={classnames(css(styles.detailsContainer), transitionStyles[state])}
            >
              {place.show_details && this.renderPlaceDetailsContainer(place)}
            </section>
          )}
        </CSSTransitionGroup>
      </article>
    );
  };

  renderPlaceDetailsContainer = place => [
    (place.address || place.location) && (
      <div className={css(styles.textContainer)} key="text-place-location">
        <i className={classnames(css(styles.icon), css(styles.iconLocation), 'fa fa-map-marker')}>
          {''}
        </i>
        <span>
          {place.address} | {place.location}
        </span>
      </div>
    ),
    place.phone && (
      <div className={css(styles.textContainer)} key="text-place-phone">
        <i className={classnames(css(styles.icon), css(styles.iconPhone), 'fa fa-phone')}>{''}</i>
        <span>{place.phone}</span>
      </div>
    ),
    place.email && (
      <div className={css(styles.textContainer)} key="text-place-email">
        <i className={classnames(css(styles.icon), css(styles.iconEmail), 'fa fa-at')}>{''}</i>
        <span className={css(styles.textPlaceEmail)}>{place.email}</span>
      </div>
    ),
    place.website && (
      <div className={css(styles.textContainer)} key="text-place-website">
        <i className={classnames(css(styles.icon), css(styles.iconWebsite), 'fa fa-link')}>{''}</i>
        <a
          className={css(styles.textPlaceWebsite)}
          href={place.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {place.website}
        </a>
      </div>
    ),
    place.fb_page && (
      <div className={css(styles.textContainer)} key="text-place-email">
        <i className={classnames(css(styles.icon), css(styles.iconFacebook), 'fa fa-facebook')}>
          {''}
        </i>
        <a
          className={css(styles.textPlaceWebsite)}
          href={place.fb_page.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {place.fb_page.label}
        </a>
      </div>
    ),
  ];

  renderTag = placeId => tag => (
    <span className={css(styles.tag)} key={`${placeId}-${tag}`}>{tag}</span>
  );

  render() {
    return [
      <p className={css(styles.pageDescription)} key="description">
        A estos sitios puedes llevar los elementos que has reciclado.
      </p>,
      <br key="separator" />,
      <section key="places">{this.state.places.map(this.renderItem)}</section>,
    ];
  }
}

export default RecyclingAgents;
