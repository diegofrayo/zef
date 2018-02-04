const ROOT = APP_SETTINGS.environment === 'development' ? '' : '/zef-app';

// eslint-disable-next-line
export const routes = {
  HOME: ROOT === '' ? '/' : ROOT,
  CONTACT: `${ROOT}/contacto`,
  HOW_TO_RECYCLE: `${ROOT}/como-reciclar`,
  RECYCLING_AGENTS: `${ROOT}/donde-reciclar`,
};
