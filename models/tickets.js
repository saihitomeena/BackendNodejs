const mongoose=require("mongoose")
const ticketSchema = new mongoose.Schema({
    uid:{
        type:String,
        required:true,
        trim:true
    },
    message:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Tickets',ticketSchema)