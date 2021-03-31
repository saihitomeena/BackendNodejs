const express= require("express")
const mongoose = require("mongoose")
const app = express()
// env config
const env = require("dotenv")
env.config()


const adminRoutes=require('./routes/admin/auth')
const ticketRoutes=require('./routes/tickets')
// mongodb connection
mongoose.connect('mongodb://localhost:27017/backend',{useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true},(err)=>{
if(err) throw err
})

app.use(express.json())
app.use('/api',adminRoutes)
app.use('/api',ticketRoutes)

app.get('/',(req,res)=>{
    res.json({message:'API working'})
})
// app running
app.listen(process.env.PORT,()=>{
    console.log(`Server Running on PORT ${process.env.PORT} `)
})
