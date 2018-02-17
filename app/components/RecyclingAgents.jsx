// npm libs
import React from 'react';
import { Transition as CSSTransitionGroup } from 'react-transition-group';
import { StyleSheet, css } from 'aphrodite';
import classnames from 'classnames';

// utils
import UtilitiesService from 'services/Utilities';
import DataLoaderService from 'services/DataLoader';

// components
import Modal from 'components/Modal';

// theme
import { createStylesheet, theme as appTheme, platform } from 'styles/createStylesheet';

const styles = StyleSheet.create(
  createStylesheet(theme => ({
    pageTitle: {
      color: theme.color.titles,
      marginBottom: theme.spacing.base,
    },
    pageDescription: {
      color: theme.color.textPrimary,
      fontSize: theme.fontSize.base,
      marginBottom: theme.spacing.base * 2,
      textAlign: 'justify',
    },
    placeContainer: {
      backgroundColor: theme.color.white[650],
      boxShadow: theme.shadow.base(theme.color.white[500]),
      cursor: 'default',
      marginBottom: theme.spacing.medium,
      padding: theme.spacing.base,
    },
    placeContainerSelected: {
      boxShadow: theme.shadow.base(theme.color.white[100]),
    },
    textContainer: {
      alignItems: 'center',
      color: theme.color.textPrimary,
      display: 'flex',
      fontSize: theme.fontSize.small,
      fontWeight: theme.fontWeight.bold,
      marginTop: theme.spacing.small + 2,
      wordBreak: 'break-word',
    },
    textContainerDescription: {
      color: theme.color.textPrimary,
      margin: `${theme.spacing.base}px 0 ${theme.spacing.base}px`,
      textAlign: 'justify',
    },
    textPlaceName: {
      color: theme.color.titles,
      fontSize: theme.fontSize.medium,
    },
    textPlaceMap: {
      color: theme.color.orange[200],
      paddingBottom: 1,
      textDecoration: 'underline',
    },
    textPlacePhone: {
      color: theme.color.red[100],
      paddingBottom: 1,
    },
    textPlaceEmail: {
      color: theme.color.green[100],
    },
    textPlaceWebsite: {
      color: theme.color.black[100],
      textDecoration: 'underline',
    },
    textPlaceFacebook: {
      color: theme.color.blue[500],
      marginLeft: theme.spacing.small,
      textDecoration: 'underline',
    },
    tag: {
      backgroundColor: theme.color.white[700],
      border: `1px solid ${theme.color.brandPrimary}`,
      color: theme.color.brandPrimary,
      cursor: 'pointer',
      display: 'inline-block',
      fontSize: theme.fontSize.small,
      marginRight: theme.spacing.base,
      marginTop: theme.spacing.small,
      padding: `${theme.spacing.small}px ${theme.spacing.base}px`,
      ...platform({
        ios: {
          fontWeight: theme.fontWeight.bold,
        },
      }),
    },
    buttonDetails: {
      fontSize: theme.fontSize.small,
      fontWeight: theme.fontWeight.bold,
      padding: theme.spacing.small,
      textAlign: 'left',
      textTransform: 'uppercase',
    },
    detailsContainer: {
      borderTop: `1px solid ${theme.color.white[500]}`,
      clear: 'both',
      padding: theme.spacing.small,
      transition: 'all .3s linear',
    },
    detailsContainerHidden: {
      opacity: 0,
    },
    detailsContainerVisible: {
      opacity: 1,
    },
    icon: {
      fontSize: theme.fontSize.large,
      fontWeight: theme.fontWeight.bold,
      marginRight: theme.spacing.small,
    },
    iconDetails: {
      fontSize: theme.fontSize.small,
    },
    iconLocation: {
      color: theme.color.orange[200],
    },
    iconPhone: {
      color: theme.color.red[100],
    },
    iconEmail: {
      color: theme.color.green[100],
    },
    iconWebsite: {
      color: theme.color.black[100],
    },
    iconFacebook: {
      color: theme.color.blue[500],
    },
  })),
);

class RecyclingAgents extends React.Component {

  pageTitle = '¿En dónde puedo reciclar?';

  state = {
    places: [],
    showModal: false,
  };

  async componentWillMount() {
    UtilitiesService.updateAppTitle(APP_SETTINGS.APP_TITLE, this.pageTitle);
    try {
      this.setState({ places: await DataLoaderService.getRecylingAgents() });
    } catch (e) {
      // TODO: Handle Errors
      console.log('RecyclingAgents => componentWillMount => getRecylingAgents', e);
    }
  }

  onClickExpandDetails = (placeSelected, attrName) => () => {
    this.setState(
      state => ({
        places: state.places.map(place => {
          if (place.id === placeSelected.id) {
            return { ...place, show_more: { [attrName]: !placeSelected.show_more[attrName] } };
          }
          return { ...place, show_more: { contact_info: false, elements_to_recycle: false } };
        }),
      }),
      () => {
        let to = window.matchMedia(appTheme.mediaQueries.mobile.js).matches
          ? appTheme.headerHeight
          : appTheme.headerHeight + 15;
        to = (attrName === 'contact_info' && !placeSelected.show_more[attrName]) ? to - 50 : to;
        UtilitiesService.animateScroll(
          document.getElementById('app-content-container'),
          document.getElementById(placeSelected.id).offsetTop - to,
          500,
        );
      },
    );
  };

  onClickShowElementDetails = () => {
    this.setState({ showModal: true });
  };

  onClickHideElementDetails = () => {
    this.setState({ showModal: false });
  };

  renderPlace = place => {

    const transitionStyles = {
      entering: css(styles.detailsContainerVisible),
      entered: css(styles.detailsContainerVisible),
      exiting: css(styles.detailsContainerHidden),
      exited: css(styles.detailsContainerHidden),
    };

    return (
      <article
        className={classnames(
          css(styles.placeContainer),
          css(
            (place.show_more.contact_info || place.show_more.elements_to_recycle) &&
              styles.placeContainerSelected,
          ),
        )}
        key={place.id}
        id={place.id}
      >
        <h1 className={css(styles.textPlaceName)}>{place.name}</h1>
        {place.description && (
          <div className={classnames(css(styles.textContainerDescription))}>
            <p>{place.description}</p>
          </div>
        )}
        {this.renderDetailsContainer({
          body: place.show_more.elements_to_recycle
            ? this.renderPlaceElementsToRecycle(place)
            : null,
          buttonLabel: 'Materiales que reciclan',
          detailsSectionName: 'elements_to_recycle',
          place,
          transitionStyles,
        })}
        {this.renderDetailsContainer({
          body: place.show_more.contact_info ? this.renderPlaceContactInfo(place) : null,
          buttonLabel: 'Información de contácto',
          detailsSectionName: 'contact_info',
          place,
          transitionStyles,
        })}
      </article>
    );
  };

  renderDetailsContainer = ({ place, buttonLabel, detailsSectionName, transitionStyles, body }) => [
    <button
      type="button"
      onClick={this.onClickExpandDetails(place, detailsSectionName)}
      className={css(styles.buttonDetails)}
      key="details-button"
    >
      {place.show_more[detailsSectionName] ? (
        <i className={classnames(css(styles.icon), css(styles.iconDetails), 'fa fa-angle-up')}>
          {''}
        </i>
      ) : (
        <i className={classnames(css(styles.icon), css(styles.iconDetails), 'fa fa-angle-right')}>
          {''}
        </i>
      )}
      <span className={classnames(place.show_more[detailsSectionName] && 'u-font-italic')}>
        {buttonLabel}
      </span>
    </button>,
    <CSSTransitionGroup
      in={place.show_more[detailsSectionName]}
      timeout={1000}
      key="details-content"
    >
      {state => (
        <section className={classnames(css(styles.detailsContainer), transitionStyles[state])}>
          {body}
        </section>
      )}
    </CSSTransitionGroup>,
  ];

  renderPlaceElementsToRecycle = place => place.tags.map(this.renderTag(place.id));

  renderTag = placeId => tag => (
    <span
      className={css(styles.tag)}
      key={`${placeId}-${tag}`}
      onClick={this.onClickShowElementDetails}
    >
      <i className="fa fa-info-circle">{''}</i> <span className="u-text-underline">{tag}</span>
    </span>
  );

  renderPlaceContactInfo = place => [
    <div className={css(styles.textContainer)} key="text-place-location">
      <i className={classnames(css(styles.icon), css(styles.iconLocation), 'fa fa-map-marker')}>
        {''}
      </i>
      <a
        className={css(styles.textPlaceMap)}
        href={place.location}
        target="_blank"
        rel="noopener noreferrer"
      >
        {place.address} - {place.city}
      </a>
    </div>,
    place.phone && (
      <div className={css(styles.textContainer)} key="text-place-phone">
        <i className={classnames(css(styles.icon), css(styles.iconPhone), 'fa fa-phone')}>{''}</i>
        <p className={css(styles.textPlacePhone)}>{place.phone}</p>
      </div>
    ),
    place.email && (
      <div className={css(styles.textContainer)} key="text-place-email">
        <i className={classnames(css(styles.icon), css(styles.iconEmail), 'fa fa-at')}>{''}</i>
        <p className={css(styles.textPlaceEmail)}>{place.email}</p>
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
      <div className={css(styles.textContainer)} key="text-place-fb-page">
        <i className={classnames(css(styles.icon), css(styles.iconFacebook), 'fa fa-facebook')}>
          {''}
        </i>
        <a
          className={css(styles.textPlaceFacebook)}
          href={place.fb_page.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {place.fb_page.label}
        </a>
      </div>
    ),
  ];

  render() {
    return [
      <h2 key="page-title" className={css(styles.pageTitle)}>
        {this.pageTitle}
      </h2>,
      <p className={css(styles.pageDescription)} key="page-description">
        Aquí puedes encontrar un listado de sitios en Armenia, en donde puedes llevar los diferentes
        tipos de elementos que has reciclado.
      </p>,
      <section key="places-container">{this.state.places.map(this.renderPlace)}</section>,
      <Modal
        key="modal"
        show={this.state.showModal}
        onClickHideModal={this.onClickHideElementDetails}
      />,
    ];
  }
}

export default RecyclingAgents;
