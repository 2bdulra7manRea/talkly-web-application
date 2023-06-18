const { userPopulate } = require("../helpers/userPopulat")
const likeModel = require("../models/like.model")

module.exports = class LikeService{
    createLike(body){
        if(body.isLiked){
           return likeModel.deleteOne({contentId:body.contentId,userId:body.userId})
        }
        return likeModel.create(body)
    };
    getLikes(contentId){
        return likeModel.find({contentId:contentId}).populate("userId",userPopulate)
    }

    check(contentId,userId){
       return likeModel.findOne({contentId,userId})
    }
}