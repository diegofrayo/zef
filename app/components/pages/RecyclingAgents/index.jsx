// npm libs
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

// services
import DataLoaderService from 'services/DataLoader';
import UtilitiesService from 'services/Utilities';

// theme
import { theme as appTheme, createStylesheet } from 'styles/createStylesheet';

// components
import Heading from 'components/common/Heading';
import Modal from 'components/layout/Modal';
import Separator from 'components/common/Separator';
import Text from 'components/common/Text';
import Agent from './components/Agent';

const modalStyles = StyleSheet.create(
  createStylesheet(theme => ({
    heading: {
      marginBottom: 0,
    },
    image: {
      display: 'block',
      height: 200,
      margin: `${theme.spacing.large}px auto`,
      maxWidth: '100%',
      padding: theme.spacing.base,
      width: 200,
    },
  })),
);

class RecyclingAgents extends React.Component {
  pageTitle = '¿En dónde puedo reciclar?';

  state = {
    agents: null,
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

  onClickCollapsibleDetailsHeading = (parent, agentSelected, attrName) => () => {
    this.setState(
      state => ({
        agents: {
          ...state.agents,
          [parent]: state.agents[parent].map(agent => {
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
        },
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

  onClickElementForRecycling = elementForRecyclingSelected => () => {
    this.setState({ showModal: true, elementForRecyclingSelected });
  };

  onClickHideElementForRecyclingDetails = () => {
    this.setState({ showModal: false, elementForRecyclingSelected: undefined });
  };

  render() {
    return [
      <Heading key="page-title" size="large" tag="h2">
        {this.pageTitle}
      </Heading>,

      <Text key="page-description">
        Aquí puedes encontrar un listado de sitios en Armenia, en donde puedes llevar los diferentes
        tipos de elementos que has reciclado.
      </Text>,

      this.state.agents !== null && (
        <section key="agents-container">
          {this.state.agents.agents.map(agent => (
            <Agent
              key={agent.id}
              agent={agent}
              parent="agents"
              onClickCollapsibleDetailsHeading={this.onClickCollapsibleDetailsHeading}
              onClickElementForRecycling={this.onClickElementForRecycling}
            />
          ))}

          <Separator />

          <section key="batteries-agents">
            <Heading>Pilas</Heading>
            <Text>En estos lugares puedes depositar pilas.</Text>
            {this.state.agents.batteries_agents.map(agent => (
              <Agent
                key={agent.id}
                agent={agent}
                parent="batteries_agents"
                onClickCollapsibleDetailsHeading={this.onClickCollapsibleDetailsHeading}
              />
            ))}
          </section>
        </section>
      ),

      this.state.showModal ? (
        <Modal
          key="modal"
          header={data => (
            <Heading size="large" className={css(modalStyles.heading)}>
              {data.label}
            </Heading>
          )}
          body={data => [
            data.images.map(url => (
              <img
                id="modal-element-for-recycling-img"
                key={`modal-element-for-recycling-img-${data.id}`}
                src={url}
                alt={data.label}
                className={css(modalStyles.image)}
                onError={() => {
                  document.getElementById(
                    'modal-element-for-recycling-img',
                  ).style.border = `1px solid ${appTheme.color.white[600]}`;
                }}
              />
            )),
            <Text key="modal-element-for-recycling-description">{data.description}</Text>,
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
