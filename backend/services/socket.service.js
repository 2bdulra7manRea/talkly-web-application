const { socketServer } = require("../server")
const CommunicationService = require("./communication.service")


const EventsSocketNames={
    CHAT_MESSAGES:"chat_messages_active"
}




module.exports = class SocketService{



static subscrbie(messageObject){
    const {chatId} = messageObject
    socketServer.to(chatId).emit(EventsSocketNames.CHAT_MESSAGES,messageObject)
}



listenToUpcomingMessages(){


socketServer.on(EventsSocketNames.CHAT_MESSAGES,CommunicationService.handleMessage)


}


}