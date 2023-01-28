const Goal=require('../model/goalModel')
const asyncHandler=require("express-async-handler")
const User=require('../model/userModel')

const getGoals=asyncHandler(async(req,res)=>{
  
  // const data=await Goal.findById({"_id":"63b6ecb14c7a858a38c115c4"})
  const data=await Goal.find({user:req.user._id})
  if(data.length!=0){
    res.status(200).json(data)
  }else{
    res.status(400)
    throw new Error("no goals found")
  }
})

const createGoal=asyncHandler(async (req,res)=>{   
  const {name,number}=req.body 
  if(name&&number){
    const goalData= await Goal.create({name,number,user:req.user._id})   
    if(goalData){
      res.status(201).json(goalData)   
    }else{
      res.status(500)
      throw new Error("error in goal creation")
    }
  }else{
    res.status(400)
    throw new Error("enter the data properly")
  }
})

const updateGoal=asyncHandler(async (req,res)=>{
  const goal=await Goal.findById({_id:req.params.id})
  if(goal){
        const user=await User.findById({_id:req.user.id})
        //checking goal user ID and User ID is same
        // if(req.user._id.toString()===goal.user.toString()){   }
        if(goal.user.toString()===user._id.toString()){
          const newData=await Goal.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
          res.status(201).json({message:"updated",newData})
        }else{
          res.status(401)
          throw new Error("user id not matching")   
        }
  }else{
     res.status(400).json("no goal found")    
  }    
})

const deleteGoal=asyncHandler(async(req,res)=>{
   

 const goal=await Goal.findById({_id:req.params.id})
  if(goal){
    const user=await User.findById({_id:req.user._id})
    //make sure logged user id matches with goal user id
    if(user._id.toString()===goal.user.toString()){
      await Goal.findById({_id:req.params.id}).deleteOne()
      res.status(200).json({message:"goal deleted"})
    }else{
      res.status(401)
      throw new Error("not authorized")
    }
  }else{
    res.status(400)
     throw new Error("no goal found")
  }
 })


module.exports={getGoals,createGoal,updateGoal,deleteGoal}