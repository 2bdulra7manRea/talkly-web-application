const { config } = require("../../configs");
const { elasticSearch } = require("../../configs/elasticSearch");
const ElasticAdapter = require("../adpater/elasticAdapter");

module.exports = class ElasticUsers {
  static async create(user) {
    return await elasticSearch.create({
      index: config.GENERAL_INDEX_SEARCH,
      id: user.securityId,
      body: {
        user_name: user.user_name,
        securityId:user.securityId,
        image: user.image ? user.image : "",
        type:"user"
      }
    });
  }

  static async update(user) {
    return await elasticSearch.update({
      index:config.GENERAL_INDEX_SEARCH,
      id: user.securityId,
      body: {
        user_name: user.user_name,
        securityId:user.securityId,
        image: user.image ? user.image : "",
        type:"user"
      }
    });
  }

  static async search(filter) {
    const results = await elasticSearch.search({
      index: config.GENERAL_INDEX_SEARCH,
      body: {
        query: {
          match: filter
        }
      }
    });
    return ElasticAdapter.adapt(results);
  }
};
