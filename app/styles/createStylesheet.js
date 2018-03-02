// npm libs
import chroma from 'chroma-js';

// services
import UtilitiesService from 'services/Utilities';

const TONES = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700];

// palette: https://coolors.co/20bf55-0b4f6c-01baef-fbfbff-757575
const DARK_BLUE = '#0B4F6C';
const DARK_GRAY = '#757575';
const GREEN = '#20BF55';
const LIGHT_BLUE = '#01BAEF';
const LIGHT_GRAY = '#FBFBFF';

export const theme = {
  headerHeight: 70,
  maxWidthContainer: 991,

  shadow: {
    base: (color = '#CACACA') => `0 0 5px 0 ${color}`,
  },

  mediaQueries: {
    mobile: {
      css: '@media screen and (max-width : 767px)',
      js: '(max-width : 767px)',
    },
  },

  spacing: {
    base: 10,
    small: 5,
    medium: 15,
    large: 20,
  },

  fontSize: {
    base: 16,
    xsmall: 12,
    small: 14,
    medium: 18,
    large: 20,
    xlarge: 22,
  },

  fontWeight: {
    thin: 100,
    normal: 400,
    semibold: 500,
    bold: 700,
  },

  color: {
    black: [...TONES].reverse().reduce((acum, current, index) => {
      // eslint-disable-next-line
      acum[current] = chroma('black')
        .brighten(index * 0.15)
        .hex();
      return acum;
    }, {}),

    white: [...TONES].reverse().reduce((acum, current, index) => {
      // eslint-disable-next-line
      acum[current] = chroma('white')
        .darken(index * 0.15)
        .hex();
      return acum;
    }, {}),

    blue: TONES.reduce((acum, current, index) => {
      // eslint-disable-next-line
      acum[current] = chroma('blue')
        .darken(index * 0.15)
        .hex();
      return acum;
    }, {}),

    red: TONES.reduce((acum, current, index) => {
      // eslint-disable-next-line
      acum[current] = chroma('red')
        .darken(index * 0.15)
        .hex();
      return acum;
    }, {}),

    yellow: TONES.reduce((acum, current, index) => {
      // eslint-disable-next-line
      acum[current] = chroma('yellow')
        .darken(index * 0.15)
        .hex();
      return acum;
    }, {}),

    green: TONES.reduce((acum, current, index) => {
      // eslint-disable-next-line
      acum[current] = chroma('green')
        .darken(index * 0.15)
        .hex();
      return acum;
    }, {}),

    orange: TONES.reduce((acum, current, index) => {
      // eslint-disable-next-line
      acum[current] = chroma('orange')
        .darken(index * 0.15)
        .hex();
      return acum;
    }, {}),

    titles: 'black',
    textPrimary: '#242424',
    textSecondary: LIGHT_GRAY,
    brandPrimary: GREEN,
    brandSecondary: DARK_BLUE,
    LIGHT_BLUE,
    DARK_GRAY,
  },
};

export const platform = ({ ios = {}, android = {} }) => {
  if (UtilitiesService.is_iOs()) {
    return ios;
  } else if (UtilitiesService.isAndroid()) {
    return android;
  }
  return {};
};

export const convertToStyleValue = styleObject => {
  return styleObject._definition;
};

export const createStylesheet = fn => fn(theme);
