const User = require('../model/user')

const asyncHandler=require('express-async-handler')
const register = asyncHandler(async(req,res)=>{
    const{email,password,firstname,lastname}=req.body
    // check để đỡ chậm cho db
    if(!email||!password||!lastname||!firstname)
    return res.status(400).json({
sucess:false,
mes: 'Missing Inputs'
})
const reponse = await User.create(req.body)
return res.status(200).json({
    sucess:reponse? true :false,
    reponse
})
})
module.exports={
    register
}
