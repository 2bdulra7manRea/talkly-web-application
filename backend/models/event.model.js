const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Eventschema = new Schema({
  title: String,
  description:String,
  speakerId:String,
  start:Date,
  end:Date,
  date:Date
});

module.exports = mongoose.model("Event", Eventschema);
