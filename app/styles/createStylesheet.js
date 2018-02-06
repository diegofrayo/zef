// npm libs
import chroma from 'chroma-js';

const TONES = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700];

// palette: https://coolors.co/20bf55-0b4f6c-01baef-fbfbff-757575
const GREEN = '#20BF55';
const DARK_BLUE = '#0B4F6C';
const LIGHT_BLUE = '#01BAEF';
const LIGHT_GRAY = '#FBFBFF';
const DARK_GRAY = '#757575';

export const theme = {

  headerHeight: 50,
  maxWidthContainer: 500,

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

    black: TONES.reduce((acum, current, index) => {
      // eslint-disable-next-line
      acum[current] = chroma('#555')
        .darken((index) * 0.2)
        .hex();
      return acum;
    }, {}),

    white: TONES.reduce((acum, current, index) => {
      // eslint-disable-next-line
      acum[current] = chroma('white')
        .darken((index) * 0.1)
        .hex();
      return acum;
    }, {}),

    blue: TONES.reduce((acum, current, index) => {
      // eslint-disable-next-line
      acum[current] = chroma(LIGHT_BLUE)
        .darken((index) * 0.1)
        .hex();
      return acum;
    }, {}),

    red: TONES.reduce((acum, current, index) => {
      // eslint-disable-next-line
      acum[current] = chroma('red')
        .darken((index) * 0.1)
        .hex();
      return acum;
    }, {}),

    green: TONES.reduce((acum, current, index) => {
      // eslint-disable-next-line
      acum[current] = chroma(GREEN)
        .darken((index) * 0.1)
        .hex();
      return acum;
    }, {}),

    yellow: TONES.reduce((acum, current, index) => {
      // eslint-disable-next-line
      acum[current] = chroma('yellow')
        .darken((index) * 0.1)
        .hex();
      return acum;
    }, {}),

    textPrimary: {
      base: DARK_GRAY,
    },

    textSecondary: {
      base: LIGHT_GRAY,
    },

    brandPrimary: {
      base: GREEN,
    },

    brandSecondary: {
      base: DARK_BLUE,
    },

  },

};

export default fn => fn(theme);
