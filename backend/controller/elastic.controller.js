const GeneralSearch = require("../services/elastic/generaSearch");


module.exports = class ElasticController {

  searchGeneralIndexed(ctx) {
    const { value } = ctx.req.params;

    if (!value) {
      throw new Error("Non valid query");
    }

    return GeneralSearch.search(value);
  }
};
