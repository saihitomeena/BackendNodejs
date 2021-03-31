const mongoose=require("mongoose"),bcrypt=require("bcrypt")
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true      
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    hash_password:{
        type:String,
        required:true
    },
    role : {
        type:String,
        enum:['admin','user'],
        required:true
     },
    createdDate:{
        type:Date,
        default:Date.now
    }
})
userSchema.virtual('password').
set(function(password){
    this.hash_password=bcrypt.hashSync(password,10)
})

userSchema.methods={
    authenticate:function(password){
        return bcrypt.compareSync(password,this.hash_password)
    }
}
module.exports = mongoose.model('Users',userSchema)