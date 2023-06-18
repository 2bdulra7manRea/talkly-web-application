const AuthHelper = require("../helpers/auth.helper");

module.exports= class CommentController{
    service;
    
    constructor(commentService){
            this.service = commentService; 
    }
    
    async create(ctx){
        const userId = AuthHelper.getUserId(ctx)
        const {req} = ctx
        const body ={
                ...req.body,
                userId,
        }    
    return await this.service.createNewComment(body)

    }


    async get(ctx){
        const {req} = ctx
        return this.service.getCommentsPost(req.query)

    }


    async getCount(ctx){
        const {req} = ctx;
        return this.service.getCount(req.params.id)
    }

    async updateComment(ctx){



    }


    async getUserComments(ctx){
        const userId = AuthHelper.getUserId(ctx)
        return this.service.getUserComments(userId)
    }



    async removeComment(ctx){


    }
    
    
    }
    