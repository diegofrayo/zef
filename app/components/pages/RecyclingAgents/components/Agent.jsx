// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite/no-important';

// components
import Box from 'components/common/Box';
import Icon from 'components/common/Icon';

// theme
import { createStylesheet } from 'styles/createStylesheet';

// components
import Heading from 'components/common/Heading';
import Link from 'components/common/Link';
import Text from 'components/common/Text';
import CollapsibleDetails from './CollapsibleDetails';

const agentStyles = StyleSheet.create(
  createStylesheet(theme => ({
    container: {
      backgroundColor: theme.color.white[650],
      boxShadow: theme.shadow.base(theme.color.white[500]),
      cursor: 'default',
      marginTop: theme.spacing.small,
      marginBottom: theme.spacing.medium,
      padding: theme.spacing.medium,
    },
    containerSelected: {
      boxShadow: theme.shadow.base(theme.color.white[100]),
    },
  })),
);

const elementsForRecyclingCollapsibleStyles = StyleSheet.create(
  createStylesheet(theme => ({
    elementForRecyclingContainer: {
      [theme.mediaQueries.mobile.css]: {
        justifyContent: 'center',
      },
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
    },
  })),
);

const contactInfoCollapsibleStyles = StyleSheet.create(
  createStylesheet(theme => ({
    textContainer: {
      color: theme.color.textPrimary,
      fontSize: theme.fontSize.small,
      fontWeight: theme.fontWeight.bold,
      marginTop: theme.spacing.small + 2,
      wordBreak: 'break-word',
    },
    textLocation: {
      color: theme.color.orange[200],
      marginLeft: theme.spacing.small,
      textDecoration: 'underline',
    },
    textPhone: {
      color: theme.color.red[100],
      marginBottom: 0,
    },
    textEmail: {
      color: theme.color.green[100],
    },
    textWebsite: {
      color: theme.color.black[100],
    },
    textFacebook: {
      color: theme.color.blue[500],
      marginLeft: theme.spacing.small,
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
  <Box
    id={agent.id}
    className={classnames(
      css(
        agentStyles.container,
        (agent.show_more.contact_info || agent.show_more.elements_to_recycle) &&
          agentStyles.containerSelected,
      ),
    )}
    column
  >
    <Heading size="small">{agent.name}</Heading>

    <Text>{agent.description}</Text>

    {agent.elements_for_recycling && (
      <CollapsibleDetails
        buttonLabel="Materiales que reciclan"
        detailsSectionName="elements_to_recycle"
        agent={agent}
        body={() => {
          if (!agent.show_more.elements_to_recycle) return null;
          return (
            <Box
              className={css(elementsForRecyclingCollapsibleStyles.elementForRecyclingContainer)}
              row
            >
              {agent.elements_for_recycling.map(elementForRecycling => (
                <span
                  key={`${elementForRecycling.id}-${agent.id}`}
                  className={css(elementsForRecyclingCollapsibleStyles.elementForRecycling)}
                  onClick={onClickElementForRecycling(elementForRecycling)}
                >
                  <Icon iconName="info" />{' '}
                  <span className="u-text-underline">{elementForRecycling.label}</span>
                </span>
              ))}
            </Box>
          );
        }}
        onClickCollapsibleDetailsHeading={onClickCollapsibleDetailsHeading}
      />
    )}

    <CollapsibleDetails
      buttonLabel="Información de contácto"
      detailsSectionName="contact_info"
      agent={agent}
      body={() => {
        if (!agent.show_more.contact_info) return null;
        return [
          agent.location.map(location => (
            <Box
              key={`agent-location-${agent.id}`}
              tag="article"
              className={css(contactInfoCollapsibleStyles.textContainer)}
              valign
            >
              <Icon
                iconName="map"
                size="large"
                className={css(contactInfoCollapsibleStyles.iconLocation)}
              />
              <Link
                style={contactInfoCollapsibleStyles.textLocation}
                href={location.map}
                target="_blank"
                underline
              >
                {location.address} - {agent.city}
              </Link>
            </Box>
          )),

          agent.phone && (
            <Box
              tag="article"
              key="agent-phone"
              className={css(contactInfoCollapsibleStyles.textContainer)}
              valign
            >
              <Icon
                iconName="phone"
                size="large"
                className={css(contactInfoCollapsibleStyles.iconPhone)}
              />
              <Text size="small" style={contactInfoCollapsibleStyles.textPhone}>
                {agent.phone}
              </Text>
            </Box>
          ),

          agent.email && (
            <Box
              tag="article"
              key="agent-email"
              className={css(contactInfoCollapsibleStyles.textContainer)}
              valign
            >
              <Icon
                iconName="email"
                size="large"
                className={css(contactInfoCollapsibleStyles.iconEmail)}
              />
              <Link
                style={contactInfoCollapsibleStyles.textEmail}
                href={`mailto:${agent.website}`}
                underline
              >
                {agent.email}
              </Link>
            </Box>
          ),

          agent.website && (
            <Box
              tag="article"
              key="agent-website"
              className={css(contactInfoCollapsibleStyles.textContainer)}
              valign
            >
              <Icon
                iconName="url"
                size="large"
                className={css(contactInfoCollapsibleStyles.iconWebsite)}
              />
              <Link
                style={contactInfoCollapsibleStyles.textWebsite}
                href={agent.website}
                target="_blank"
                underline
              >
                {agent.website}
              </Link>
            </Box>
          ),

          agent.fb_page && (
            <Box
              tag="article"
              key="agent-fb-page"
              className={css(contactInfoCollapsibleStyles.textContainer)}
              valign
            >
              <Icon
                iconName="facebook"
                size="large"
                className={css(contactInfoCollapsibleStyles.iconFacebook)}
              />
              <Link
                style={contactInfoCollapsibleStyles.textFacebook}
                href={agent.fb_page.url}
                target="_blank"
                underline
              >
                {agent.fb_page.label}
              </Link>
            </Box>
          ),
        ];
      }}
      onClickCollapsibleDetailsHeading={onClickCollapsibleDetailsHeading}
    />
  </Box>
);

Agent.propTypes = {
  agent: PropTypes.object.isRequired,
  onClickCollapsibleDetailsHeading: PropTypes.func.isRequired,
  onClickElementForRecycling: PropTypes.func,
};

Agent.defaultProps = {
  onClickElementForRecycling: () => {},
};

export default Agent;
