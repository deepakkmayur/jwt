const Goal=require('../model/goalModel')
const asyncHandler=require("express-async-handler")

const getGoals=asyncHandler(async(req,res)=>{
  const data=await Goal.find()
  // const data=Goal.findById({"_id":"63b6ecb14c7a858a38c115c4"})
  console.log(data);
  res.status(200).json(data)
})

const createGoal=asyncHandler(async (req,res)=>{   
  console.log(req.params);    
  // const data= await Goal.create(req.body)     
  res.status(200)   
})

const uppdateGoal=asyncHandler(async (req,res)=>{
  const data=await Goal.findById({_id:req.params.id})
  if(data && req.body.name){
    const newData=await Goal.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
    res.status(200).json({message:"updated",newData})
  }else{
     res.status(404).json("error occured")    
  }    
})

const deleteGoal=asyncHandler(async(req,res)=>{
   
  console.log(req.params.id);
  data=await Goal.findById({_id:req.params.id})
  console.log(data);
  if(data){
    await Goal.findById({_id:req.params.id}).deleteMany()
    res.status(200).json({message:"goal deleted"})
  }else{
    res.status(400).json({message:"error"})
    console.log("2222");
  }
 })


module.exports={getGoals,createGoal,uppdateGoal,deleteGoal}