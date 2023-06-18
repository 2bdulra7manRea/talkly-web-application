const Routing = require("../services/Routing.service");
const ElasticController = require("../controller/elastic.controller");

const elasticRouter = (app) => {
  const route = new Routing(app);
  const elasticController = new ElasticController();
  route.get("/elastic/search/:value", elasticController.searchGeneralIndexed);
};

module.exports = { elasticRouter };
