const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
  body: String,
  title: String,
  userId:{type:ObjectId , ref:"userInfo"},
  url: String,
  date: Date
});

module.exports = mongoose.model("Post", PostSchema);
