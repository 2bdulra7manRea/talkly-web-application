




const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const InboxQueueSchema = new Schema({
securityId:{type:ObjectId , ref:"userInfo"},
messagesQueue:[messageModel]
});


module.exports = mongoose.model("Inbox", InboxQueueSchema);
