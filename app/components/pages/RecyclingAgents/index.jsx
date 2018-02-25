// npm libs
import React from 'react';
import { Transition as CSSTransitionGroup } from 'react-transition-group';
import { css } from 'aphrodite';
import classnames from 'classnames';

// utils
import UtilitiesService from 'services/Utilities';
import DataLoaderService from 'services/DataLoader';

// components
import Modal from 'components/layout/Modal';
import Heading from 'components/common/Heading';
import Text from 'components/common/Text';

// theme
import { theme as appTheme } from 'styles/createStylesheet';

import {
  agentStyles,
  collapsibleDetailsStyles,
  elementsForRecyclingCollapsibleStyles,
  contactInfoCollapsibleStyles,
  modalStyles,
} from './stylesheet';

const CollapsibleDetails = ({
  buttonLabel,
  detailsSectionName,
  agent,
  body,
  transitionStyles,
  onClickCollapsibleDetailsHeading,
}) => [
  <button
    key={`details-collapsible-heading-${agent.id}`}
    type="button"
    className={css(collapsibleDetailsStyles.buttonHeading)}
    onClick={onClickCollapsibleDetailsHeading(agent, detailsSectionName)}
  >
    {agent.show_more[detailsSectionName] ? (
      <i
        className={classnames(
          css(collapsibleDetailsStyles.icon),
          css(collapsibleDetailsStyles.iconDetails),
          'fa fa-angle-up',
        )}
      >
        {''}
      </i>
    ) : (
      <i
        className={classnames(
          css(collapsibleDetailsStyles.icon),
          css(collapsibleDetailsStyles.iconDetails),
          'fa fa-angle-right',
        )}
      >
        {''}
      </i>
    )}
    <span className={classnames(agent.show_more[detailsSectionName] && 'u-font-italic')}>
      {buttonLabel}
    </span>
  </button>,
  <CSSTransitionGroup
    key={`details-content-${agent.id}`}
    in={agent.show_more[detailsSectionName]}
    timeout={1000}
  >
    {state => (
      <section
        className={classnames(css(collapsibleDetailsStyles.container), transitionStyles[state])}
      >
        {body(agent)}
      </section>
    )}
  </CSSTransitionGroup>,
];

const Agent = ({
  agent,
  onClickCollapsibleDetailsHeading,
  onClickShowElementForRecyclingDetails,
}) => {
  const transitionStyles = {
    entering: css(collapsibleDetailsStyles.containerVisible),
    entered: css(collapsibleDetailsStyles.containerVisible),
    exiting: css(collapsibleDetailsStyles.containerHidden),
    exited: css(collapsibleDetailsStyles.containerHidden),
  };

  return (
    <article
      id={agent.id}
      className={classnames(
        css(agentStyles.container),
        css(
          (agent.show_more.contact_info || agent.show_more.elements_to_recycle) &&
            agentStyles.containerSelected,
        ),
      )}
    >
      <Heading tag="h1" className={css(agentStyles.titleName)}>
        {() => agent.name}
      </Heading>
      <Text className={css(agentStyles.textDescription)}>{() => agent.description}</Text>
      <CollapsibleDetails
        buttonLabel="Materiales que reciclan"
        detailsSectionName="elements_to_recycle"
        agent={agent}
        body={() => {
          if (!agent.show_more.elements_to_recycle) return null;
          return agent.elements_for_recycling.map((elementForRecycling, index, array) => (
            <span
              key={`${elementForRecycling.id}-${index}-${array.length}`}
              className={css(elementsForRecyclingCollapsibleStyles.elementForRecycling)}
              onClick={onClickShowElementForRecyclingDetails(elementForRecycling)}
            >
              <i className="fa fa-info-circle">{''}</i>{' '}
              <span className="u-text-underline">{elementForRecycling.label}</span>
            </span>
          ));
        }}
        transitionStyles={transitionStyles}
        onClickCollapsibleDetailsHeading={onClickCollapsibleDetailsHeading}
      />
      <CollapsibleDetails
        buttonLabel="Información de contácto"
        detailsSectionName="contact_info"
        agent={agent}
        body={() => {
          if (!agent.show_more.contact_info) return null;
          return [
            <div
              key="agent-location"
              className={css(contactInfoCollapsibleStyles.textContainer)}
            >
              <i
                className={classnames(
                  css(collapsibleDetailsStyles.icon),
                  css(contactInfoCollapsibleStyles.iconLocation),
                  'fa fa-map-marker',
                )}
              >
                {''}
              </i>
              <a
                className={css(contactInfoCollapsibleStyles.textLocation)}
                href={agent.location}
                target="_blank"
                rel="noopener noreferrer"
              >
                {agent.address} - {agent.city}
              </a>
            </div>,
            agent.phone && (
              <div
                key="agent-phone"
                className={css(contactInfoCollapsibleStyles.textContainer)}
              >
                <i
                  className={classnames(
                    css(collapsibleDetailsStyles.icon),
                    css(contactInfoCollapsibleStyles.iconPhone),
                    'fa fa-phone',
                  )}
                >
                  {''}
                </i>
                <p className={css(contactInfoCollapsibleStyles.textPhone)}>{agent.phone}</p>
              </div>
            ),
            agent.email && (
              <div
                key="agent-email"
                className={css(contactInfoCollapsibleStyles.textContainer)}
              >
                <i
                  className={classnames(
                    css(collapsibleDetailsStyles.icon),
                    css(contactInfoCollapsibleStyles.iconEmail),
                    'fa fa-at',
                  )}
                >
                  {''}
                </i>
                <p className={css(contactInfoCollapsibleStyles.textEmail)}>{agent.email}</p>
              </div>
            ),
            agent.website && (
              <div
                key="agent-website"
                className={css(contactInfoCollapsibleStyles.textContainer)}
              >
                <i
                  className={classnames(
                    css(collapsibleDetailsStyles.icon),
                    css(contactInfoCollapsibleStyles.iconWebsite),
                    'fa fa-link',
                  )}
                >
                  {''}
                </i>
                <a
                  className={css(contactInfoCollapsibleStyles.textWebsite)}
                  href={agent.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {agent.website}
                </a>
              </div>
            ),
            agent.fb_page && (
              <div
                key="agent-fb-page"
                className={css(contactInfoCollapsibleStyles.textContainer)}
              >
                <i
                  className={classnames(
                    css(collapsibleDetailsStyles.icon),
                    css(contactInfoCollapsibleStyles.iconFacebook),
                    'fa fa-facebook',
                  )}
                >
                  {''}
                </i>
                <a
                  className={css(contactInfoCollapsibleStyles.textFacebook)}
                  href={agent.fb_page.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {agent.fb_page.label}
                </a>
              </div>
            ),
          ];
        }}
        transitionStyles={transitionStyles}
        onClickCollapsibleDetailsHeading={onClickCollapsibleDetailsHeading}
      />
    </article>
  );
};

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

  onClickCollapsibleDetailsHeading = (agentSelected, attrName) => () => {
    this.setState(
      state => ({
        agents: state.agents.map(agent => {
          if (agent.id === agentSelected.id) {
            return {
              ...agent,
              show_more: Object.keys(agent.show_more).reduce((acum, curr) => {
                acum[curr] = false; // eslint-disable-line
                if (curr === attrName) acum[curr] = !agentSelected.show_more[attrName]; // eslint-disable-line
                return acum;
              }, {}),
            };
          }
          return { ...agent, show_more: { contact_info: false, elements_to_recycle: false } };
        }),
      }),
      () => {
        let to = window.matchMedia(appTheme.mediaQueries.mobile.js).matches
          ? appTheme.headerHeight
          : appTheme.headerHeight + 15;
        to = attrName === 'contact_info' && !agentSelected.show_more[attrName] ? to - 50 : to;
        UtilitiesService.animateScroll(
          document.getElementById('app-content-container'),
          document.getElementById(agentSelected.id).offsetTop - to,
          500,
        );
      },
    );
  };

  onClickShowElementForRecyclingDetails = elementForRecyclingSelected => () => {
    this.setState({ showModal: true, elementForRecyclingSelected });
  };

  onClickHideElementForRecyclingDetails = () => {
    this.setState({ showModal: false, elementForRecyclingSelected: undefined });
  };

  render() {
    return [
      <Heading key="page-title" tag="h2">
        {() => this.pageTitle}
      </Heading>,

      <Text key="page-description">
        {() =>
          'Aquí puedes encontrar un listado de sitios en Armenia, en donde puedes llevar los diferentes tipos de elementos que has reciclado.'
        }
      </Text>,

      <section key="agents-container">
        {this.state.agents.map(agent => (
          <Agent
            key={agent.id}
            agent={agent}
            onClickCollapsibleDetailsHeading={this.onClickCollapsibleDetailsHeading}
            onClickShowElementForRecyclingDetails={this.onClickShowElementForRecyclingDetails}
          />
        ))}
      </section>,

      this.state.showModal ? (
        <Modal
          key="modal"
          header={data => <Heading tag="h1">{() => data.label}</Heading>}
          body={data => [
            data.images.map((url, index) => (
              <img
                key={`modal-element-for-recycling-img-${data.id}-${index}`}
                src={url}
                alt={data.label}
                className={css(modalStyles.image)}
              />
            )),
            <Text
              key="modal-element-for-recycling-description"
              className={css(modalStyles.description)}
            >
              {() => data.description}
            </Text>,
          ]}
          data={this.state.elementForRecyclingSelected}
          show={this.state.showModal}
          onClickHideModal={this.onClickHideElementForRecyclingDetails}
        />
      ) : null,
    ];
  }
}

export default RecyclingAgents;
