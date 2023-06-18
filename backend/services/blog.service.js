const { isNonValidFilterNumber } = require("../helpers/helper");
const { userPopulate } = require("../helpers/userPopulat");
const blogModel = require("../models/blog.model");
const ElasticPostsBlogs = require("./elastic/posts_blogs");

module.exports = class BlogService {
  async createNewBlog(body) {

  const result = await blogModel.create(body);

  // const blogResults=await blogModel.findById(result._id).populate("userId",userPopulate)

  //   console.log(blogResults)

  await ElasticPostsBlogs.create(result,"blog")

  return result
  }

  async getUserBlogs(id) {
    const result = await blogModel
      .find({ userId: id })
      .populate("userId", userPopulate);
    return result;
  }

  async getBlogs(filter) {
    const { limit, offset } = filter;
    const where = { limit, offset };

    if (isNonValidFilterNumber(limit)) {
      where.limit = 10;
    }
    if (isNonValidFilterNumber(offset)) {
      where.offset = 0;
    }

    return blogModel
      .find({})
      .limit(where.limit)
      .skip(where.offset)
      .sort({date:"desc"})
      .populate("userId", userPopulate);
  }


  async getBlogById(id){
    return blogModel.findById(id).populate("userId", userPopulate);
  }

};
