let mongoose=require("mongoose")

const userSchema=mongoose.Schema({
 name:String,
 email:String,
 gender:String,
 pass:String,
 age:Number,
 city:String,
 Is_married:Boolean,
 User_id:String


 

},{
    versionKey:false
})

const userModel=mongoose.model("User",userSchema)

module.exports={userModel}