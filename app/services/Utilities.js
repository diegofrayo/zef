const getDeviceOS = () => {

  const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains 'Android'
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }

  return 'unknown';
};

const deviceOS = getDeviceOS();

export default {

  updateAppTitle(appTitle, pageTitle) {
    document.title = `${appTitle} - ${pageTitle}`;
  },

  sort(attr = '', order = 'asc') {

    let greater = 1;
    let smaller = -1;

    if (order === 'desc') {
      greater = -1;
      smaller = 1;
    }

    const sortFn = (a, b) => {

      let aAttr = a[attr];
      let bAttr = b[attr];

      if (aAttr === undefined || aAttr === null) {
        aAttr = '';
      }

      if (bAttr === undefined || bAttr === null) {
        bAttr = '';
      }

      aAttr = aAttr.toLowerCase();
      bAttr = bAttr.toLowerCase();

      if (aAttr === bAttr) {
        return 0;
      } else if (aAttr > bAttr) {
        return greater;
      }

      return smaller;
    };

    return sortFn;
  },

  animateScroll(element, to, duration) {

    let currentTime = 0;
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;

    const easeInOutQuad = (a, b, c, d) => {
      let t = a;
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t -= 1;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animateScroll = () => {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val; // eslint-disable-line
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  },

  is_iOs() {
    return deviceOS === 'iOS';
  },

  isAndroid() {
    return deviceOS === 'Android';
  },

};
