const AuthHelper = require("../helpers/auth.helper");







module.exports= class ChatController{
    service;
    
    constructor(chatService){
            this.service = chatService; 
    }
    

    async getMyChat(ctx){
        const {id} = ctx.req.params
        const userId=AuthHelper.getUserId(ctx)
        return this.service.getMyChatWrapper(id,userId)
    }

    async getChats(ctx){
        const userId=AuthHelper.getUserId(ctx)
        return this.service.getUserChats(userId)
    }
    
    async changeStatus(ctx){
        const {body} = ctx.req
        return this.service.changeStatus(body)

    }
    
    async findOrCreateChat(ctx){
        const {body} = ctx.req
         const userId=AuthHelper.getUserId(ctx)
         const obj = {
            ...body,
            userId
         }
        return this.service.findOrCreateChat(obj)
    }


    async addMessage(ctx){
        return this.service.addMessage(ctx.req.body)
    }


    async getChatMessages(ctx){

        const {id} = ctx.req.params

        return this.service.getChatMessages(id)
    }


    }