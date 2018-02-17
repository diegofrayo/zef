const ROOT = APP_SETTINGS.environment === 'development' ? '' : '/zef';

// eslint-disable-next-line
export const routes = {
  HOME: ROOT === '' ? '/' : ROOT,
  CONTACT: `${ROOT}/contacto`,
  HOW_TO_RECYCLE: `${ROOT}/como-reciclar`,
  PROJECTS: `${ROOT}/proyectos`,
  RECYCLING_AGENTS: `${ROOT}/donde-reciclar`,
  STATISTICS: `${ROOT}/estadísticas`,
};
