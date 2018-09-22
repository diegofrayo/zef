// npm libs
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

// services
import DataLoaderService from 'services/DataLoader';
import UtilitiesService from 'services/Utilities';

// theme
import { createStylesheet, theme as appTheme } from 'styles/createStylesheet';

// components
import Box from 'components/common/Box';
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
        /*
        let to = window.matchMedia(appTheme.mediaQueries.mobile.js).matches
          ? appTheme.headerHeight - 5
          : appTheme.headerHeight + 15;
        to = attrName === 'contact_info' && !agentSelected.show_more[attrName] ? to - 50 : to;
        UtilitiesService.animateScroll(
          document.getElementById('recycling-agents-container'),
          document.getElementById(agentSelected.id).offsetTop - to,
          500,
        );
        */
        const to = !agentSelected.show_more[attrName] ? 20 : -20;
        UtilitiesService.animateScroll(
          document.getElementById('recycling-agents-container'),
          document.getElementById('recycling-agents-container').scrollTop + to,
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
    return (
      <Box pageContainer grow column id="recycling-agents-container">
        <Heading tag="h2" size="large">
          {this.pageTitle}
        </Heading>

        <Text align="justify" size="normal">
          Aquí puedes encontrar un listado de sitios en Armenia, en donde puedes llevar los
          diferentes tipos de elementos que has reciclado.
        </Text>

        <Box column>
          <Box row align="space-around">
            {this.state.agents.map(agent => {
              if (agent.category !== 'normal') return null;
              return (
                <Agent
                  key={agent.id}
                  agent={agent}
                  listName="agents"
                  onClickCollapsibleDetailsHeading={this.onClickCollapsibleDetailsHeading}
                  onClickElementForRecycling={this.onClickElementForRecycling}
                />
              );
            })}
          </Box>

          <Separator marginTop={10} marginBottom={15} />

          <Box column>
            <Heading tag="h2" size="large">
              Pilas
            </Heading>
            <Text size="normal">En estos lugares puedes depositar pilas.</Text>
            <Box row align="space-around">
              {this.state.agents.map(agent => {
                if (agent.category !== 'batteries') return null;
                return (
                  <Agent
                    key={agent.id}
                    agent={agent}
                    listName="batteries_agents"
                    onClickCollapsibleDetailsHeading={this.onClickCollapsibleDetailsHeading}
                  />
                );
              })}
            </Box>
          </Box>
        </Box>

        {this.state.showModal ? (
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
                    const image = document.getElementById('modal-element-for-recycling-img');
                    image.style.border = `1px solid ${appTheme.color.white[600]}`;

                    if (image.getAttribute('src').indexOf('default.png') === -1) {
                      image.setAttribute('src', '/zef/images/elements-for-recycling/default.png');
                    }
                  }}
                />
              )),
              <Text size="normal" key="modal-element-for-recycling-description">
                {data.description}
              </Text>,
            ]}
            data={this.state.elementForRecyclingSelected}
            show={this.state.showModal}
            onClickHideModal={this.onClickHideElementForRecyclingDetails}
          />
        ) : null}
      </Box>
    );
  }
}

export default RecyclingAgents;
