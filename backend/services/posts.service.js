const { isNonValidFilterNumber } = require("../helpers/helper");
const { userPopulate } = require("../helpers/userPopulat");
const postModel = require("../models/post.model");
const ElasticPostsBlogs = require("./elastic/posts_blogs");

module.exports = class PostsService {
  async createNewPost(body) {
    const results = await postModel.create(body);
    // const postResults = await postModel
    //   .findById(results._id)
    //   .populate("userId", userPopulate);

    await ElasticPostsBlogs.create(results,"post");

    return results;
  }

  async getUserPosts(id) {
    const result = await postModel
      .find({ userId: id })
      .populate("userId", userPopulate);
    return result;
  }

  async getPostById(id) {
    const result = await postModel.findById(id)
      .populate("userId", userPopulate);
    return result;
  }


  async getPosts(filter) {
    const { limit, offset } = filter;
    const where = { limit, offset };

    if (isNonValidFilterNumber(limit)) {
      where.limit = 10;
    }
    if (isNonValidFilterNumber(offset)) {
      where.offset = 0;
    }

    return await postModel
      .find({})
      .limit(where.limit)
      .skip(where.offset)
      .sort({ date: "desc" })
      .populate("userId", userPopulate);
  }
};
