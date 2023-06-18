const { isNonValidFilterNumber } = require("../helpers/helper");
const { userPopulate } = require("../helpers/userPopulat");
const chatModel = require("../models/chat.model");
const connectionUserStatusModel = require("../models/connectionUserStatus.model");
const messageModel = require("../models/message.model");
const AuthService = require("./auth.service");

module.exports = class ChatService {
  async createNewChat(body) {
    const doc = {
      userId:body.userId,
      peerId:body.peerId,
      date:new Date()
    }
    return chatModel.create(doc);
  }

async getMyChat(userId,peerId){

  console.log(userId,peerId);

  const result = await chatModel.findOne({
    $or:[
      {userId:userId , peerId:peerId},
      {peerId:userId , userId:peerId},
    ]
  }).populate([{path:"userId" , select:{_id:0,user_name:1 , securityId:1, image:1}},{path:"peerId" , select:{_id:0,user_name:1 , securityId:1, image:1}},])

return result;
}

async getMyChatWrapper(securityId,userId){
  const authService = new AuthService();
  const peerId= await authService.getIdBySecurityId(securityId)
  console.log(peerId);


  return this.getMyChat(peerId,userId)
}

  async getUserChats(id) {
    const result = await chatModel
      .find({ $or:[{peerId:id},{userId:id}]}).populate([{path:"userId" , select:{_id:0,user_name:1 , securityId:1, image:1}},{path:"peerId" , select:{_id:0,user_name:1 , securityId:1, image:1}},])
    return result;
  }



  async getchats(filter) {
    const { limit, offset } = filter;
    const where = { limit, offset };

    if (isNonValidFilterNumber(limit)) {
      where.limit = 10;
    }
    if (isNonValidFilterNumber(offset)) {
      where.offset = 0;
    }

    return chatModel
      .find({})
      .limit(where.limit)
      .skip(where.offset)
      .sort({date:"desc"})
      .populate("userId", userPopulate);
  }


  async getChatById(id){
    return chatModel.findById(id).populate("userId", userPopulate);
  }




  async findOrCreateChat(body){


    const authService = new AuthService();
    const peerId= await authService.getIdBySecurityId(body.securityId)

   const result = await this.getMyChat(peerId,body.userId)
    if(result && result._id){
      return result
    }
   return await this.createNewChat({...body,peerId:peerId})

  }


  async changeStatus(userConnection){
  
  return await connectionUserStatusModel.updateOne({securityId:userConnection.securityId},{
      $set:{status:userConnection.status}
    })
  }


  async isUserConnected(userObject){
   const isOnline= await connectionUserStatusModel.findById(userObject.securityId)

   if(isOnline && isOnline.status){
    return true
   }

   return false
  }



  async addMessage(message){
   return messageModel.create(message)
  }

  async getChatMessages(chatId){

    return messageModel.find({chatId:chatId})
    
  }


};
