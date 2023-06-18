const Routing = require("../services/Routing.service");
const LikesService = require("../services/like.service");
const LikeController = require("../controller/like.controller");

const likeRouter = (app) => {
  const likeService = new LikesService();
  const likeController = new LikeController(likeService);

  const route = new Routing(app);
  route.post("/likes/new", likeController.create.bind(likeController));
  route.get("/likes/:id", likeController.get.bind(likeController));
  route.get("/likes/check/:contentId", likeController.check.bind(likeController));
};

module.exports = { likeRouter };
