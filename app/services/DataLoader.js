// services
import UtilitiesService from 'services/Utilities';

export default {
  async getRecylingAgents() {
    // eslint-disable-next-line
    const recyclingAgents = require('./../../assets/data/recycling_agents.json');
    const elementsForRecycling = await this.getElementsForRecycling();

    return Promise.resolve(
      recyclingAgents.agents
        .map(agent => {
          const newAgent = {
            ...agent,
            show_more: {
              contact_info: false,
              elements_to_recycle: false,
            },
          };

          if (newAgent.category === 'normal') {
            newAgent.elements_for_recycling = newAgent.elements_for_recycling.reduce(
              (acum, current) => {
                if (elementsForRecycling[current]) acum.push(elementsForRecycling[current]);
                return acum;
              },
              [],
            );
          }

          return newAgent;
        })
        .sort(UtilitiesService.sort('name', 'asc')),
    );
  },

  async getElementsForRecycling() {
    // eslint-disable-next-line
    return Promise.resolve(require('./../../assets/data/elements_for_recycling.json'));
  },
};
