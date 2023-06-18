const AuthHelper = require("../helpers/auth.helper");

module.exports = class BlogController {
  service;

  constructor(blogService) {
    this.service = blogService;
  }

  async create(ctx) {
    const userId = AuthHelper.getUserId(ctx);
    const { req } = ctx;
    const body = {
      ...req.body,
      userId
    };
    return await this.service.createNewBlog(body);
  }

  async getBlogs(ctx) {
    const { req } = ctx;

    return this.service.getBlogs(req.query);
  }


  async getBlogById(ctx){

    const {id}  = ctx.req.params
    return this.service.getBlogById(id)
  }


  async getMyBlogs(ctx) {
    const userId = AuthHelper.getUserId(ctx);

    return this.service.getUserBlogs(userId);
  }
};
