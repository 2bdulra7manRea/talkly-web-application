



const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const connectionUserStatusSchema = new Schema({
  securityId:{type:String , ref:"userInfo"},
  status:{
    type:Boolean,
    default:false
  },
  updatedAt:Date,
});

module.exports = mongoose.model("Connection_User_Status", connectionUserStatusSchema);
