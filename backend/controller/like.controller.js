const AuthHelper = require("../helpers/auth.helper");

module.exports = class LikeController {
  service;

  constructor(likeService) {
    this.service = likeService;
  }

  async create(ctx) {
    const { body } = ctx.req;
    const userId = AuthHelper.getUserId(ctx);
    const doc = {
      ...body,
      userId
    };

    return await this.service.createLike(doc);
  }

  async check(ctx){
    const userId = AuthHelper.getUserId(ctx);
    const {contentId} = ctx.req.params;
    return await this.service.check(contentId,userId)
  }

  async get(ctx) {
    const { id } = ctx.req.params;
    return this.service.getLikes(id);
  }
};
