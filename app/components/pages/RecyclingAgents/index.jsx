// npm libs
import React from 'react';
import { Transition as CSSTransitionGroup } from 'react-transition-group';
import { StyleSheet, css } from 'aphrodite';
import classnames from 'classnames';

// utils
import UtilitiesService from 'services/Utilities';
import DataLoaderService from 'services/DataLoader';

// components
import Modal from 'components/layout/Modal';

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
    agentContainer: {
      backgroundColor: theme.color.white[650],
      boxShadow: theme.shadow.base(theme.color.white[500]),
      cursor: 'default',
      marginBottom: theme.spacing.medium,
      padding: theme.spacing.base,
    },
    agentContainerSelected: {
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
    textAgentName: {
      color: theme.color.titles,
      fontSize: theme.fontSize.medium,
    },
    textAgentMap: {
      color: theme.color.orange[200],
      paddingBottom: 1,
      textDecoration: 'underline',
    },
    textAgentPhone: {
      color: theme.color.red[100],
      paddingBottom: 1,
    },
    textAgentEmail: {
      color: theme.color.green[100],
    },
    textAgentWebsite: {
      color: theme.color.black[100],
      textDecoration: 'underline',
    },
    textAgentFacebook: {
      color: theme.color.blue[500],
      marginLeft: theme.spacing.small,
      textDecoration: 'underline',
    },
    elementForRecycling: {
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
    agents: [],
    showModal: false,
    elementForRecyclingSelected: undefined,
  };

  async componentWillMount() {
    UtilitiesService.updateAppTitle(APP_SETTINGS.APP_TITLE, this.pageTitle);
    try {
      this.setState({ agents: await DataLoaderService.getRecylingAgents() });
    } catch (e) {
      // TODO: Handle Errors
      console.log('RecyclingAgents => componentWillMount => getRecylingAgents', e);
    }
  }

  componentDidCatch() {
    console.log('componentDidCatch');
  }

  onClickExpandDetails = (agentSelected, attrName) => () => {
    this.setState(
      state => ({
        agents: state.agents.map(agent => {
          if (agent.id === agentSelected.id) {
            return { ...agent, show_more: { [attrName]: !agentSelected.show_more[attrName] } };
          }
          return { ...agent, show_more: { contact_info: false, elements_to_recycle: false } };
        }),
      }),
      () => {
        let to = window.matchMedia(appTheme.mediaQueries.mobile.js).matches
          ? appTheme.headerHeight
          : appTheme.headerHeight + 15;
        to = (attrName === 'contact_info' && !agentSelected.show_more[attrName]) ? to - 50 : to;
        UtilitiesService.animateScroll(
          document.getElementById('app-content-container'),
          document.getElementById(agentSelected.id).offsetTop - to,
          500,
        );
      },
    );
  };

  onClickShowElementDetails = (elementForRecycling) => () => {
    this.setState({ showModal: true, elementForRecyclingSelected: elementForRecycling });
  };

  onClickHideElementDetails = () => {
    this.setState({ showModal: false, elementForRecyclingSelected: undefined });
  };

  renderAgent = agent => {

    const transitionStyles = {
      entering: css(styles.detailsContainerVisible),
      entered: css(styles.detailsContainerVisible),
      exiting: css(styles.detailsContainerHidden),
      exited: css(styles.detailsContainerHidden),
    };

    return (
      <article
        className={classnames(
          css(styles.agentContainer),
          css(
            (agent.show_more.contact_info || agent.show_more.elements_to_recycle) &&
              styles.agentContainerSelected,
          ),
        )}
        key={agent.id}
        id={agent.id}
      >
        <h1 className={css(styles.textAgentName)}>{agent.name}</h1>
        {agent.description && (
          <div className={classnames(css(styles.textContainerDescription))}>
            <p>{agent.description}</p>
          </div>
        )}
        {this.renderDetailsContainer({
          body: agent.show_more.elements_to_recycle
            ? this.renderAgentElementsToRecycle(agent)
            : null,
          buttonLabel: 'Materiales que reciclan',
          detailsSectionName: 'elements_to_recycle',
          agent,
          transitionStyles,
        })}
        {this.renderDetailsContainer({
          body: agent.show_more.contact_info ? this.renderAgentContactInfo(agent) : null,
          buttonLabel: 'Información de contácto',
          detailsSectionName: 'contact_info',
          agent,
          transitionStyles,
        })}
      </article>
    );
  };

  renderDetailsContainer = ({ agent, buttonLabel, detailsSectionName, transitionStyles, body }) => [
    <button
      type="button"
      onClick={this.onClickExpandDetails(agent, detailsSectionName)}
      className={css(styles.buttonDetails)}
      key="details-button"
    >
      {agent.show_more[detailsSectionName] ? (
        <i className={classnames(css(styles.icon), css(styles.iconDetails), 'fa fa-angle-up')}>
          {''}
        </i>
      ) : (
        <i className={classnames(css(styles.icon), css(styles.iconDetails), 'fa fa-angle-right')}>
          {''}
        </i>
      )}
      <span className={classnames(agent.show_more[detailsSectionName] && 'u-font-italic')}>
        {buttonLabel}
      </span>
    </button>,
    <CSSTransitionGroup
      in={agent.show_more[detailsSectionName]}
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

  renderAgentElementsToRecycle = agent => agent.elements_for_recycling.map(this.renderElementForRecycling(agent.id));

  renderElementForRecycling = agentId => elementForRecycling => (
    <span
      className={css(styles.elementForRecycling)}
      key={`${agentId}-${elementForRecycling.id}`}
      onClick={this.onClickShowElementDetails(elementForRecycling)}
    >
      <i className="fa fa-info-circle">{''}</i> <span className="u-text-underline">{elementForRecycling.label}</span>
    </span>
  );

  renderAgentContactInfo = agent => [
    <div className={css(styles.textContainer)} key="text-agent-location">
      <i className={classnames(css(styles.icon), css(styles.iconLocation), 'fa fa-map-marker')}>
        {''}
      </i>
      <a
        className={css(styles.textAgentMap)}
        href={agent.location}
        target="_blank"
        rel="noopener noreferrer"
      >
        {agent.address} - {agent.city}
      </a>
    </div>,
    agent.phone && (
      <div className={css(styles.textContainer)} key="text-agent-phone">
        <i className={classnames(css(styles.icon), css(styles.iconPhone), 'fa fa-phone')}>{''}</i>
        <p className={css(styles.textAgentPhone)}>{agent.phone}</p>
      </div>
    ),
    agent.email && (
      <div className={css(styles.textContainer)} key="text-agent-email">
        <i className={classnames(css(styles.icon), css(styles.iconEmail), 'fa fa-at')}>{''}</i>
        <p className={css(styles.textAgentEmail)}>{agent.email}</p>
      </div>
    ),
    agent.website && (
      <div className={css(styles.textContainer)} key="text-agent-website">
        <i className={classnames(css(styles.icon), css(styles.iconWebsite), 'fa fa-link')}>{''}</i>
        <a
          className={css(styles.textAgentWebsite)}
          href={agent.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {agent.website}
        </a>
      </div>
    ),
    agent.fb_page && (
      <div className={css(styles.textContainer)} key="text-agent-fb-page">
        <i className={classnames(css(styles.icon), css(styles.iconFacebook), 'fa fa-facebook')}>
          {''}
        </i>
        <a
          className={css(styles.textAgentFacebook)}
          href={agent.fb_page.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {agent.fb_page.label}
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
      <section key="agents-container">{this.state.agents.map(this.renderAgent)}</section>,
      this.state.showModal ? <Modal
        key="modal"
        show={this.state.showModal}
        onClickHideModal={this.onClickHideElementDetails}
        elementInfo={this.state.elementForRecyclingSelected}
      /> : null,
    ];
  }
}

export default RecyclingAgents;
