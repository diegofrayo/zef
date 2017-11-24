export const theme = {
  spacing: {
    base: 10,
    small: 5,
    normal: 10,
    medium: 15,
    large: 20,
  },
  color: {
    body: '#FEFEFE',
    backgroundPrimary: '#EAEAEA',
    backgroundSecondary: '#CACACA',
    textPrimary: '#323232',
    textSecondary: '#878787',
    themeColor1: '',
    themeColor2: '',
  },
  headerHeight: 50,
  maxWidthContainer: 500,
};

export default fn => fn(theme);
