const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
  postId: String,
  userId:{type:ObjectId , ref:"userInfo"},
  date:Date,
  body:String,
});

module.exports = mongoose.model("Comment", CommentSchema);
