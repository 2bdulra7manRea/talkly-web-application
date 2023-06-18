const PostsService = require("../services/posts.service");
const PostController = require("../controller/posts.controller");
const Routing = require("../services/Routing.service");

const postsRouter = (app) => {
  const postService = new PostsService();
  const postController = new PostController(postService);
  const route = new Routing(app);
  route.post("/posts/new", postController.create.bind(postController));
  route.get("/posts", postController.getPosts.bind(postController));
  route.get(
    "/posts/details/:id",
    postController.getPostById.bind(postController)
  );
  route.get("/posts/user", postController.getMyPosts.bind(postController));
};

module.exports = { postsRouter };
