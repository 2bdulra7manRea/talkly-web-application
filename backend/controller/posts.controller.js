const AuthHelper = require("../helpers/auth.helper");

module.exports= class PostController{
service;

constructor(postService){
        this.service = postService; 
}

async create(ctx){
const userId = AuthHelper.getUserId(ctx)
const {req} = ctx
const body ={
        ...req.body,
        userId,
}
return await this.service.createNewPost(body)
}

async getPosts(ctx){

const {req} = ctx

return this.service.getPosts(req.query)

}


async getMyPosts(ctx){

        const userId = AuthHelper.getUserId(ctx)

        return this.service.getUserPosts(userId)

}


async getPostById(ctx){
        const {id} = ctx.req.params
        return this.service.getPostById(id)
}


}
