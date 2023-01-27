const express=require('express')
const {getGoals,createGoal,uppdateGoal,deleteGoal}=require('../controllers/goalController')

const router=express.Router()

router.get('/all',getGoals)
router.post('/all/:id',createGoal)
router.put('/all/:id',uppdateGoal) 
router.delete('/all/:id',deleteGoal)    


module.exports=router