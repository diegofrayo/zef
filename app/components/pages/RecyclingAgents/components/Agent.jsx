// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import classnames from 'classnames';

// theme
import { createStylesheet, platform } from 'styles/createStylesheet';

// components
import Heading from 'components/common/Heading';
import Text from 'components/common/Text';
import CollapsibleDetails from './CollapsibleDetails';

const agentStyles = StyleSheet.create(
  createStylesheet(theme => ({
    container: {
      backgroundColor: theme.color.white[650],
      boxShadow: theme.shadow.base(theme.color.white[500]),
      cursor: 'default',
      marginBottom: theme.spacing.medium,
      padding: theme.spacing.base,
    },
    containerSelected: {
      boxShadow: theme.shadow.base(theme.color.white[100]),
    },
    titleName: {
      fontSize: theme.fontSize.medium,
    },
    textDescription: {
      color: theme.color.textPrimary,
      margin: `${theme.spacing.base}px 0 ${theme.spacing.base}px`,
      textAlign: 'justify',
    },
    icon: {
      fontSize: theme.fontSize.large,
      fontWeight: theme.fontWeight.bold,
      marginRight: theme.spacing.small,
    },
  })),
);

const elementsForRecyclingCollapsibleStyles = StyleSheet.create(
  createStylesheet(theme => ({
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
  })),
);

const contactInfoCollapsibleStyles = StyleSheet.create(
  createStylesheet(theme => ({
    textContainer: {
      alignItems: 'center',
      color: theme.color.textPrimary,
      display: 'flex',
      fontSize: theme.fontSize.small,
      fontWeight: theme.fontWeight.bold,
      marginTop: theme.spacing.small + 2,
      wordBreak: 'break-word',
    },
    textLocation: {
      color: theme.color.orange[200],
      paddingBottom: 1,
      textDecoration: 'underline',
    },
    textPhone: {
      color: theme.color.red[100],
      paddingBottom: 1,
    },
    textEmail: {
      color: theme.color.green[100],
    },
    textWebsite: {
      color: theme.color.black[100],
      textDecoration: 'underline',
    },
    textFacebook: {
      color: theme.color.blue[500],
      marginLeft: theme.spacing.small,
      textDecoration: 'underline',
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

const Agent = ({ agent, onClickCollapsibleDetailsHeading, onClickElementForRecycling }) => (
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
        return agent.elements_for_recycling.map(elementForRecycling => (
          <span
            key={`${elementForRecycling.id}-${agent.id}`}
            className={css(elementsForRecyclingCollapsibleStyles.elementForRecycling)}
            onClick={onClickElementForRecycling(elementForRecycling)}
          >
            <i className="fa fa-info-circle">{''}</i>{' '}
            <span className="u-text-underline">{elementForRecycling.label}</span>
          </span>
        ));
      }}
      onClickCollapsibleDetailsHeading={onClickCollapsibleDetailsHeading}
    />
    <CollapsibleDetails
      buttonLabel="Información de contácto"
      detailsSectionName="contact_info"
      agent={agent}
      body={() => {
        if (!agent.show_more.contact_info) return null;
        return [
          <div key="agent-location" className={css(contactInfoCollapsibleStyles.textContainer)}>
            <i
              className={classnames(
                css(agentStyles.icon),
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
            <div key="agent-phone" className={css(contactInfoCollapsibleStyles.textContainer)}>
              <i
                className={classnames(
                  css(agentStyles.icon),
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
            <div key="agent-email" className={css(contactInfoCollapsibleStyles.textContainer)}>
              <i
                className={classnames(
                  css(agentStyles.icon),
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
            <div key="agent-website" className={css(contactInfoCollapsibleStyles.textContainer)}>
              <i
                className={classnames(
                  css(agentStyles.icon),
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
            <div key="agent-fb-page" className={css(contactInfoCollapsibleStyles.textContainer)}>
              <i
                className={classnames(
                  css(agentStyles.icon),
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
      onClickCollapsibleDetailsHeading={onClickCollapsibleDetailsHeading}
    />
  </article>
);

Agent.propTypes = {
  agent: PropTypes.object.isRequired,
  onClickCollapsibleDetailsHeading: PropTypes.func.isRequired,
  onClickElementForRecycling: PropTypes.func.isRequired,
};

export default Agent;
