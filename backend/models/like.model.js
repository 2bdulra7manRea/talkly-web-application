const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const LikeSchema = new Schema({
  contentId: String,
  userId:{type:ObjectId , ref:"userInfo"},
});

module.exports = mongoose.model("Like", LikeSchema);
