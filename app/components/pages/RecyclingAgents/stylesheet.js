// npm libs
import { StyleSheet } from 'aphrodite';

// theme
import { createStylesheet, platform } from 'styles/createStylesheet';

const pageStyles = StyleSheet.create(createStylesheet(() => ({})));

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
  })),
);

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

const modalStyles = StyleSheet.create(
  createStylesheet(theme => ({
    image: {
      border: `1px solid ${theme.color.white[600]}`,
      display: 'block',
      height: 200,
      margin: `${theme.spacing.large}px auto`,
      maxWidth: '100%',
      padding: theme.spacing.base,
      width: 200,
    },
    description: {},
  })),
);

export {
  pageStyles,
  agentStyles,
  collapsibleDetailsStyles,
  elementsForRecyclingCollapsibleStyles,
  contactInfoCollapsibleStyles,
  modalStyles,
};
