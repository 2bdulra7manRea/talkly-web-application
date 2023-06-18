const { config } = require("../../configs");
const { elasticSearch } = require("../../configs/elasticSearch");
const ElasticAdapter = require("../adpater/elasticAdapter");

module.exports = class GeneralSearch {
 static async search(value) {
    const results = await elasticSearch.search({
      index: config.GENERAL_INDEX_SEARCH,
      query: {
        multi_match: {
          query: value,
          fields: ["title^2", "body", "user_name^3"],
          type: "phrase"
        }
      }
    });

    return ElasticAdapter.adapt(results);
  }
};
