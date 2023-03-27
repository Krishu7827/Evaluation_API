let express=require("express")
const { message } = require("statuses")
let {connection}=require("./models/Database")
let {router}=require("./Router/user.Router")
let {PostRouter}=require("./Router/Post.Router")
let {authenticate}=require("./middleware/authenticate.middleware")
let cors=require("cors")
require("dotenv").config()
let app=express()
app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
  res.send("HOME PAGE")
})
console.log("java")

app.use("/users",router)

app.use(authenticate)
app.use("/posts",PostRouter)


app.listen(process.env.port, async()=>{
  try{
    await connection
   console.log("mongodb is connected")

  }catch(err){
      console.log({err:message})
  }

  console.log(`server is running on port ${process.env.port}`)
   
})