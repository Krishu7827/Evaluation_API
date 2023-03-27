const express = require("express")
const { postModel } = require("../models/Post.model.js")
const PostRouter = express.Router()
let jwt=require("jsonwebtoken")
PostRouter.use(express.json())

PostRouter.get("/", async (req, res) => {
    const token=req.headers.authorization
    let min=req.query.min
    let max=req.query.max
    let deviceName=req.query.device
    const decoded=jwt.verify(token,"masai")
     if(decoded && min==undefined && max==undefined && deviceName==undefined){
        
        let notes= await postModel.find({"User_id":decoded.userId})
      
        res.send(notes)
     }else if(decoded && min!=undefined && max!=undefined){

       let notes= await postModel.find({$and:
        [{"User_id":decoded.userId},{no_of_comments:{$gt:min}}, {no_of_comments:{$lt:max}}]})
       res.send(notes)

     }else if(decoded && deviceName!=undefined){
        let notes= await postModel.find({$and:
            [{User_id:decoded.userId},{device:deviceName}]})
           res.send(notes)
     }else{

        res.status(404).send({message:"Something Wrong...."})
     }
})
PostRouter.post("/add", async (req, res) => {
 
    let payload = req.body
    let new_note = new postModel(payload)
    await new_note.save()
    res.send({ "msg": "Post Created" })
})
PostRouter.patch("/update/:userId", async (req, res) => {
    const token=req.headers.authorization
    try{
        const decoded=jwt.verify(token,"masai")
        let userID=req.params.userId
      
        if(decoded.userId==userID){
         
            let payload = req.body
            await postModel.updateOne({User_id:decoded.userId},payload )
            res.send({ "msg": `${userID} document is updated` })
        }else{
            res.send({"message":"User Is Not Same"})
        }
    }catch(err){
        res.status(400).send({message:err.message})
    }
   

    
})
PostRouter.delete("/delete/:userId", async (req, res) => {
    const token=req.headers.authorization
    try{
        const decoded=jwt.verify(token,"masai")
        let userID=req.params.userId
      
        if(decoded.userId==userID){
         
          await postModel.deleteOne({User_id:decoded.userId})
            res.send({ "msg": `${userID} document is deleted` })
        }else{
            res.send({"message":"User Is Not Same"})
        }
    }catch(err){

        res.status(400).send({message:err.message})
    }
})

PostRouter.get("/top", async (req, res) => {
    const token=req.headers.authorization
    let min=req.query.min
    let max=req.query.max
    const decoded=jwt.verify(token,"masai")
     if(decoded && req.query==undefined){
        
        let notes= await postModel.find({"User_id":decoded.userId})
      
        res.send(notes)
     }else if(decoded && min!=undefined && max!=undefined){

       let notes= await postModel.find({$and:
        [{"User_id":decoded.userId},{no_of_comments:{$gt:min}}, {no_of_comments:{$lt:max}}]}).limit(1)
       res.send(notes)
     }
})
module.exports = {
    PostRouter
}
