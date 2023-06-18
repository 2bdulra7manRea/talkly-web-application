

const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MessageSchema = new Schema({
  message_from:{type:String},
  message_to:{type:String},
  chatId:String,
  date:Date,
  content:String,
  isRead:{
    type:Boolean,
    default:false
  },
  acknowledged:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("Message", MessageSchema);
