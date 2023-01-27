const asyncHandler=require('express-async-handler')
const User=require('../model/userModel')
const Goal=require('../model/goalModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

//register
const registerUser=asyncHandler(async(req,res)=>{
const {name,email,password}=req.body
if(name && email && password){
const userExist=await User.find({email})
if(userExist.length!=0){
   res.status(400)
   throw new Error("user already exist")
}else{
  const salt=await bcrypt.genSalt(10)
  const hashedPassword=await bcrypt.hash(password,salt)
  const user=await User.create({name,email,password:hashedPassword})
  if(user){
   res.status(200).json({user,token:generateToken(user._id)})
  }else{
   res.status(500)
   throw new Error("cannot insert the user details")
  }
}
}else{
   res.status(400)
   throw new Error("enter the credentilas properly")
}
})


//login
const loginUser=asyncHandler(async (req,res)=>{  
const {email,password}=req.body
if(email && password){  
const userDetails=await User.findOne({email})  
    const confirmPass=await bcrypt.compare(password,userDetails.password)    
    if(confirmPass){
      res.status(200)
      res.json({userDetails,token:generateToken(userDetails._id)}) 
    }else{
   res.status(500)
   throw new Error("password incorrect")
}
}else{
   res.status(400)
   throw new Error("enter the data properly")  
}
})

   
//get user
const getUser =asyncHandler(async (req,res)=>{
   console.log(req.params);
   const allGoals=await Goal.find({_id:req.params.id})

   res.status(200).json(allGoals)
 })


 //generate token
 const generateToken=(id)=>{
   return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:60000})
 }

module.exports={registerUser,loginUser,getUser}