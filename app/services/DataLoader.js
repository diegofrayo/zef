// services
import UtilitiesService from 'services/Utilities';

let elementsForRecycling;
let recyclingAgents;

export default {
  async getRecylingAgents() {
    // eslint-disable-next-line
    if (!recyclingAgents) recyclingAgents = require('./../../assets/data/recycling_agents.json');

    // eslint-disable-next-line
    const elementsForRecycling = await this.getElementsForRecycling();

    return Promise.resolve({
      agents: recyclingAgents.agents
        .map(place => ({
          ...place,
          show_more: {
            contact_info: false,
            elements_to_recycle: false,
          },
          elements_for_recycling: place.elements_for_recycling.reduce((acum, current) => {
            if (elementsForRecycling[current]) acum.push(elementsForRecycling[current]);
            return acum;
          }, []),
        }))
        .sort(UtilitiesService.sort('name', 'asc')),

      batteries_agents: recyclingAgents.batteries_agents
        .map(place => ({
          ...place,
          show_more: {
            contact_info: false,
            elements_to_recycle: false,
          },
        }))
        .sort(UtilitiesService.sort('name', 'asc')),
    });
  },

  async getElementsForRecycling() {
    if (!elementsForRecycling) {
      // eslint-disable-next-line
      elementsForRecycling = require('./../../assets/data/elements_for_recycling.json');
    }

    return Promise.resolve(elementsForRecycling);
  },
};
