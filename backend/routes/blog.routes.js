const BlogController = require("../controller/blog.controller");
const BlogService = require("../services/blog.service");
const Routing = require("../services/Routing.service");

const blogsRouter = (application) => {
  const blogServicce = new BlogService();
  const blogController = new BlogController(blogServicce);
  const route = new Routing(application);

  route.post("/blogs/new", blogController.create.bind(blogController));
  route.get("/blogs", blogController.getBlogs.bind(blogController));
  route.get("/blogs/:id", blogController.getBlogById.bind(blogController));
  route.get("/blogs/user", blogController.getMyBlogs.bind(blogController));
};

module.exports = { blogsRouter };
