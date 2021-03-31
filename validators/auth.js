const {check,validationResult} = require('express-validator')
exports.validatesignupRequest=[
    check('firstName').
    notEmpty().
    withMessage('First Name is Required'),
    check('lastName').
    notEmpty().
    withMessage('Last Name is required'),
    check('email').
    isEmail().
    withMessage('Email ID is required'),
    check('password').
    isLength({min:6}).
    withMessage('Minimun 6 charcters length')
];

exports.validatesigninRequest=[
    check('email').
    isEmail().
    withMessage('Email is required'),
    check('password').
    isLength({min:6}).
    withMessage('Password should be more than 6 characters')

]

exports.isRequestValidated=(req,res,next)=>{
    const errors= validationResult(req)
    if(errors.array().length>0)
    {
      return res.status(400).json({errors:errors.array()[0].msg})  
    }
    next()
}