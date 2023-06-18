const inboxModel = require("../models/inbox.model");
const messageModel = require("../models/message.model");
const ChatService = require("./chat.service");
const SocketService = require("./socket.service");



module.exports = class CommunicationService{




static async handleMessage(messageObject){

const message = await messageModel.create(messageObject)    
const {message_to} = message;

const chatService= new ChatService();

const isOnline= await chatService.isUserConnected(message_to)

if(!isOnline){

await inboxModel.updateOne({securityId:message_to.securityId},{$push:message})
return;
}


SocketService.subscrbie(messageObject);

// create a message ;

// check if the message_to user is online ?
// if yes , send the message to the socket
// if no , push notification and push the messsage in inbox_queue;
// when the user will be connected to the chat, 
// send the messages
//* the user will be online when he is connected to the chat;
//*  the user will be offline when he is not connected to the chat;
}








}