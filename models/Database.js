let mongoose=require("mongoose")
require("dotenv").config()
let connection =mongoose.connect("mongodb+srv://Krishna:Kumar@cluster0.xveo6ik.mongodb.net/PostApp?retryWrites=true&w=majority")


module.exports={connection}