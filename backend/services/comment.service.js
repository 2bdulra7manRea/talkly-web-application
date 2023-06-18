const { isNonValidFilterNumber } = require("../helpers/helper");
const { userPopulate } = require("../helpers/userPopulat");
const commentModel = require("../models/comment.model");

module.exports = class CommentService {
  async createNewComment(body) {
    return commentModel.create(body);
  }

  async getUserComments(id) {
    return commentModel
      .find({ userId: id })
      .populate("userId", userPopulate);
  }

  async getCommentsPost(filter) {
    const { postId, limit, offset } = filter;

    const where = { limit, offset };

    if (!postId) {
      throw new Error("Query is not valid");
    }

    if (isNonValidFilterNumber(limit)) {
      where.limit = 10;
    }
    if (isNonValidFilterNumber(offset)) {
      where.offset = 0;
    }

    return commentModel
      .find({ postId })
      .limit(where.limit)
      .skip(where.offset)
      .sort({ date: "desc" })
      .populate("userId",userPopulate);
  }

  async updateComment(body) {
    return { body };
  }

  async getCount(postId) {
    if (!postId) {
      throw new Error("non valid query");
    }
    return commentModel.count({ postId: postId });
  }

  async removeComment(id) {}
};
