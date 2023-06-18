

const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ChatSchema = new Schema({
  userId:{type:ObjectId , ref:"userInfo"  },
  peerId:{type:ObjectId , ref:"userInfo"  },
  date:{
    type:Date,
    default:new Date()
  }
});



module.exports = mongoose.model("Chat", ChatSchema);
