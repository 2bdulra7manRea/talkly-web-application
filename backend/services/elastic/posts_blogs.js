const { config } = require("../../configs");
const { elasticSearch } = require("../../configs/elasticSearch");
const ElasticAdapter = require("../adpater/elasticAdapter");

module.exports = class ElasticPostsBlogs {
  static async create(doc,type) {
    return await elasticSearch.create({
      index: config.GENERAL_INDEX_SEARCH,
      id: doc._id,
      body: {
        title:doc.title,
        body:doc.body,
        type:type
      }
    });
  }

  static async search(filter) {
    console.log(filter);
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
