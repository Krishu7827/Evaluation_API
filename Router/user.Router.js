let express=require("express")
let {userModel}=require("../models/User.model")

let jwt=require("jsonwebtoken")
let bcrypt=require("bcrypt")
let fs=require("fs")

let router=express.Router()
router.use(express.json())

router.post("/register",async(req,res)=>{
  let {name,email,gender,pass,age,city,Is_married}=req.body
     let IsexistUser= await userModel.find({email})

     if(IsexistUser.length>0){
     
         res.send("User already exist, please login")
     }else{

  try{
    bcrypt.hash(pass, 8, async (err, hash)=>{
    const user=new userModel({name,email,gender,pass:hash,age,city,Is_married})
    await user.save()
    res.send({message:"Register Succesfull!!"})
    });
    }catch(err){
    res.send({message:"Error in registering the user"})
    console.log(err)
   
    }
  }
})

router.post("/login",async(req,res)=>{
  const {email,pass}=req.body
try{
const user=await userModel.findOne({email})
if(user){
bcrypt.compare(pass, user.pass, function(err, result) {
if(result){
const token = jwt.sign({ userId: user._id}, 'masai');

res.send({"msg":"Login Successfull","token":token})

} else {res.status(400).send("Wrong Credntials")}
});
} else {
res.status(400).send("Wrong Credntials")
}
} catch(err){
res.status(400).send("Something went wrong")
console.log(err)
}
})

  





 
  
  module.exports={router}