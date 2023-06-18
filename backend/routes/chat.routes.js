const ChatController = require("../controller/chat.controller");
const ChatService = require("../services/chat.service");
const Routing = require("../services/Routing.service")



const chatRouter=(app)=>{

const route = new Routing(app);

const chatService = new ChatService();
const chatController = new ChatController(chatService)

route.get("/chats/:id", chatController.getChats.bind(chatController))
route.post("/chats/connection-status", chatController.changeStatus.bind(chatController))
route.post("/chats/new", chatController.findOrCreateChat.bind(chatController))
route.get('/chats/t/messages/:id',chatController.getMyChat.bind(chatController))
route.post('/chats/t/messages/new',chatController.addMessage.bind(chatController))
route.get('/chats/l/messages/:id',chatController.getChatMessages.bind(chatController))
}


module.exports ={chatRouter}