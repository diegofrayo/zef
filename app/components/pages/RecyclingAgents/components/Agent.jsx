// npm libs
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite/no-important';

// components
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
      marginTop: theme.spacing.medium,
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

const Location = ({ address, city, location }) => (
  <section>
    <Icon iconName="map" size="large" className={css(contactInfoCollapsibleStyles.iconLocation)} />
    <Link
      style={contactInfoCollapsibleStyles.textLocation}
      href={location}
      target="_blank"
      underline
    >
      {address} - {city}
    </Link>
  </section>
);

Location.propTypes = {
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

const Agent = ({ agent, parent, onClickCollapsibleDetailsHeading, onClickElementForRecycling }) => (
  <article
    id={agent.id}
    className={classnames(
      css(
        agentStyles.container,
        (agent.show_more.contact_info || agent.show_more.elements_to_recycle) &&
          agentStyles.containerSelected,
      ),
    )}
  >
    <Heading size="small">{agent.name}</Heading>

    <Text>{agent.description}</Text>

    {agent.elements_for_recycling && (
      <CollapsibleDetails
        buttonLabel="Materiales que reciclan"
        detailsSectionName="elements_to_recycle"
        agent={agent}
        parent={parent}
        body={() => {
          if (!agent.show_more.elements_to_recycle) return null;
          return agent.elements_for_recycling.map(elementForRecycling => (
            <span
              key={`${elementForRecycling.id}-${agent.id}`}
              className={css(elementsForRecyclingCollapsibleStyles.elementForRecycling)}
              onClick={onClickElementForRecycling(elementForRecycling)}
            >
              <Icon iconName="info" />{' '}
              <span className="u-text-underline">{elementForRecycling.label}</span>
            </span>
          ));
        }}
        onClickCollapsibleDetailsHeading={onClickCollapsibleDetailsHeading}
      />
    )}

    <CollapsibleDetails
      buttonLabel="Información de contácto"
      detailsSectionName="contact_info"
      agent={agent}
      parent={parent}
      body={() => {
        if (!agent.show_more.contact_info) return null;
        return [
          <article key="agent-location" className={css(contactInfoCollapsibleStyles.textContainer)}>
            {Array.isArray(agent.location) ? (
              agent.location.map(location => (
                <Location key={`agent-location-${agent.id}`} city={agent.city} {...location} />
              ))
            ) : (
              <Location city={agent.city} address={agent.address} location={agent.location} />
            )}
          </article>,

          agent.phone && (
            <article key="agent-phone" className={css(contactInfoCollapsibleStyles.textContainer)}>
              <Icon
                iconName="phone"
                size="large"
                className={css(contactInfoCollapsibleStyles.iconPhone)}
              />
              <Text size="small" style={contactInfoCollapsibleStyles.textPhone}>
                {agent.phone}
              </Text>
            </article>
          ),

          agent.email && (
            <article key="agent-email" className={css(contactInfoCollapsibleStyles.textContainer)}>
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
            </article>
          ),

          agent.website && (
            <article
              key="agent-website"
              className={css(contactInfoCollapsibleStyles.textContainer)}
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
            </article>
          ),

          agent.fb_page && (
            <article
              key="agent-fb-page"
              className={css(contactInfoCollapsibleStyles.textContainer)}
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
            </article>
          ),
        ];
      }}
      onClickCollapsibleDetailsHeading={onClickCollapsibleDetailsHeading}
    />
  </article>
);

Agent.propTypes = {
  agent: PropTypes.object.isRequired,
  parent: PropTypes.string.isRequired,
  onClickCollapsibleDetailsHeading: PropTypes.func.isRequired,
  onClickElementForRecycling: PropTypes.func,
};

Agent.defaultProps = {
  onClickElementForRecycling: () => {},
};

export default Agent;
