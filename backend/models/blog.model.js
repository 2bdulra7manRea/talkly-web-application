
const mongoose= require('mongoose');



const BlogSchema = new mongoose.Schema({
body:String,
title:String,
date:Date,
userId:{type:mongoose.Types.ObjectId , ref:"userInfo"},
cover:String,
})

module.exports = mongoose.model('Blog',BlogSchema)