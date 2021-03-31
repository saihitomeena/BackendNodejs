const express=require('express')
const {signup, signin,updateprofile}=require('../../controllers/admin/auth')
const { requireSignin,adminMiddleware,userMiddleware} = require('../../middleware')
const { validatesignupRequest,validatesigninRequest,isRequestValidated } = require('../../validators/auth')
const router=express.Router()
router.post('/signup',validatesignupRequest,isRequestValidated,signup)
router.post('/signin',validatesigninRequest,isRequestValidated,signin)
router.put('/updateprofile/:id',requireSignin,adminMiddleware,updateprofile)
module.exports = router