import chroma from 'chroma-js';

const tones = [100, 200, 300, 400, 500, 600, 700];

export const theme = {
  spacing: {
    base: 10,
    small: 5,
    normal: 10,
    medium: 15,
    large: 20,
  },
  fontSize: {
    base: 16,
    xsmall: 12,
    small: 14,
    medium: 16,
    large: 18,
    xlarge: 20,
  },
  color: {
    body: '#FFF',
    black: tones.reduce((acum, current, index) => {
      // eslint-disable-next-line
      acum[current] = chroma('#555')
        .darken((index + 1) * 0.2)
        .hex();
      return acum;
    }, {}),
    backgroundPrimary: {
      base: '#FFF',
      ...tones.reduce((acum, current, index) => {
        // eslint-disable-next-line
        acum[current] = chroma('#FFF')
          .darken((index + 1) * 0.2)
          .hex();
        return acum;
      }, {}),
    },
    backgroundSecondary: {
      base: '#CCC',
      ...tones.reduce((acum, current, index) => {
        // eslint-disable-next-line
        acum[current] = chroma('#CCC')
          .darken((index + 1) * 0.2)
          .hex();
        return acum;
      }, {}),
    },
    textPrimary: {
      base: '#111',
      ...tones.reduce((acum, current, index) => {
        // eslint-disable-next-line
        acum[current] = chroma('#222')
          .darken((index + 1) * 0.2)
          .hex();
        return acum;
      }, {}),
    },
    textSecondary: {
      base: '#555',
      ...tones.reduce((acum, current, index) => {
        // eslint-disable-next-line
        acum[current] = chroma('#666')
          .darken((index + 1) * 0.2)
          .hex();
        return acum;
      }, {}),
    },
    themeColor1: {
      base: '#7ABD64',
    },
    themeColor2: '',
  },
  headerHeight: 50,
  maxWidthContainer: 500,
};

export default fn => fn(theme);
