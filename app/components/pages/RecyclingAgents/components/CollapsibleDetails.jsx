// npm libs
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import classnames from 'classnames';
import { Transition as CSSTransitionGroup } from 'react-transition-group';

// theme
import { createStylesheet } from 'styles/createStylesheet';

const collapsibleDetailsStyles = StyleSheet.create(
  createStylesheet(theme => ({
    container: {
      borderTop: `1px solid ${theme.color.white[500]}`,
      clear: 'both',
      padding: theme.spacing.small,
      transition: 'all .3s linear',
    },
    containerHidden: {
      opacity: 0,
    },
    containerVisible: {
      opacity: 1,
    },
    buttonHeading: {
      fontSize: theme.fontSize.small,
      fontWeight: theme.fontWeight.bold,
      padding: theme.spacing.small,
      textAlign: 'left',
      textTransform: 'uppercase',
    },
    icon: {
      fontSize: theme.fontSize.large,
      fontWeight: theme.fontWeight.bold,
      marginRight: theme.spacing.small,
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
};
