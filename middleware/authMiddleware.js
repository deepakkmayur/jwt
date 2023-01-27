const jwt=require('jsonwebtoken')
const asyncHandler=require('express-async-handler')


const protect=asyncHandler(async(req,res,next)=>{
   

   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
     
      try {
         //getting token form header
         let token= req.headers.authorization.split(' ')[1]

         //decoding and verifying token
         let decodedToken=jwt.verify(token,process.env.JWT_SECRET)
         
         //get user from token
         // req.user=
    
       } catch (error) {
         console.log(error); 
       
       
       }

   }else{
      res.status(400)
      throw new Error("")
   }
   
   })


module.exports=protect