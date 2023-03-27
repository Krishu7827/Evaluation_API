let mongoose=require("mongoose")

const postSchema=mongoose.Schema({
  title:String,
  body:String,
  device:String,
  no_of_comments:Number,
  User_id:String


},{
    versionKey:false
})

const postModel=mongoose.model("Post",postSchema)

module.exports={postModel}