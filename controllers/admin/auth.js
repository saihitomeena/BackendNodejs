const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt=require("bcrypt")
const User=require("../../models/admin/auth")

exports.signup = function(req,res){

const { firstName,lastName,email,password,role} = req.body

const _user = new User({
    firstName,
    lastName,
    email,
    password,
    role
    
});

_user.save((err,data)=>{
   
    if(err)
    {
        return res.status(400).json({message:'Something went Wrong'})
    }

    if(data)
    {
        return res.status(201).json({message:'User Created Successfully'})
    }
    
})

}

exports.signin = (req,res)=>{
  
User.findOne({email:req.body.email}).
exec((error,user)=>{
if(error)
{
    return res.status(400).json({error})
}

if(user)
{
    if(user.authenticate(req.body.password))
    {
        const token = jwt.sign({ _id:user._id,role:user.role },process.env.JWT_SECRECT,{expiresIn:'1h'})
        const { _id,firstName,lastName,email,role} = user
        res.status(200).json({
            token,
            user:{_id,firstName,lastName,email,role}
        })
    }
    else
    {
        return res.status(400).json({message:'Invalid Email & Password'})
    }

}
else
{
    return res.status(400).json({message:'Invalid Email & Password'})
}

})

}

exports.updateprofile=(req,res)=>{
    User.findOne({_id: req.params.id})
    .then(user => {
      // new values
      if(req.body.firstName)
      {
        user.firstName = req.body.firstName;
      }
      if(req.body.lastName)
      {
      user.lastName = req.body.lastName;
      }
      user.save()
     .then(user => {
        res.send(user);
      }).catch((e) => {        
           res.status(400).send(e);      
      })
  });
}