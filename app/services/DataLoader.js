// utils
import UtilitiesService from 'services/Utilities';

export default {

  async getRecylingAgents() {
    // eslint-disable-next-line
    return Promise.resolve(require('./../../assets/data/recycling_places.json')
      .map(place => ({ show_more: { contact_info: false, elements_to_recycle: false }, ...place }))
      .sort(UtilitiesService.sort('name', 'asc')));
  },

};
