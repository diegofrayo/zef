// npm libs
import React from 'react';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Transition as CSSTransitionGroup } from 'react-transition-group';

// components
import Box from 'components/common/Box';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

// theme
import { createStylesheet } from 'styles/createStylesheet';

const collapsibleDetailsStyles = StyleSheet.create(
  createStylesheet(theme => ({
    container: {
      borderTop: `1px solid ${theme.color.white[500]}`,
      clear: 'both',
      transition: 'all .3s linear',
    },
    containerHidden: {
      opacity: 0,
      marginTop: theme.spacing.small,
    },
    containerVisible: {
      opacity: 1,
      marginBottom: theme.spacing.base,
      padding: theme.spacing.small,
    },
    heading: {
      fontSize: theme.fontSize.small,
      fontWeight: theme.fontWeight.bold,
      paddingBottom: theme.spacing.small,
      textAlign: 'left',
      textTransform: 'uppercase',
      width: '100%',
    },
  })),
);

export default ({
  buttonLabel,
  detailsSectionName,
  agent,
  body,
  onClickCollapsibleDetailsHeading,
}) => {
  const transitionStyles = {
    entering: css(collapsibleDetailsStyles.containerVisible),
    entered: css(collapsibleDetailsStyles.containerVisible),
    exiting: css(collapsibleDetailsStyles.containerHidden),
    exited: css(collapsibleDetailsStyles.containerHidden),
  };

  return [
    <Button
      key={`details-collapsible-heading-${agent.id}`}
      style={collapsibleDetailsStyles.heading}
      onClick={onClickCollapsibleDetailsHeading(agent, detailsSectionName)}
    >
      {agent.show_more[detailsSectionName] ? (
        <Icon iconName="rowUp" size="small" />
      ) : (
        <Icon iconName="rowRight" size="small" />
      )}
      <span className={classnames(agent.show_more[detailsSectionName] && 'u-font-italic')}>
        {buttonLabel}
      </span>
    </Button>,
    <CSSTransitionGroup
      key={`details-content-${agent.id}`}
      in={agent.show_more[detailsSectionName]}
      timeout={1000}
    >
      {state => (
        <Box
          className={classnames(css(collapsibleDetailsStyles.container), transitionStyles[state])}
          column
        >
          {body(agent)}
        </Box>
      )}
    </CSSTransitionGroup>,
  ];
};
