const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unqiue: true
  },
  password: {
    type: String,
    required: true
  },
  image: String,
  user_name: String,
  country: String,
  city: String,
  job_title: String,
  securityId: String,
  linkedin: String,
  github: String,
  cv: String
});

module.exports = mongoose.model("userInfo", UserSchema);
