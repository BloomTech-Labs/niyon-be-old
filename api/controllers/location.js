const models = require('../../database/models');
const response = require('../helpers/response');

module.exports = {
  async getCountries(req, res, next) {
    try {
      const countries = await models.Locations.findAll({
        attributes: ['country_name'],
        returning: true
      });
      if (countries) return response.success(res, 201, countries);
      return response.error(res, 404, 'Could not fetch countries');
    } catch (error) {
      return next({ message: error.message });
    }
  },

  async getCitiesByCountries(req, res, next) {
    try {
      const { country } = req.params;
      const cities = await models.Locations.findAll({
        attributes: ['city_name'],
        where: { country_name: country },
        returning: true
      });
      if (cities) return response.success(res, 201, cities);
      return response.error(res, 404, 'Could not fetch cities');
    } catch (error) {
      return next({ message: error.message });
    }
  }
};