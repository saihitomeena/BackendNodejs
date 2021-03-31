const Tickets=require('../models/tickets')

function createTicket(tickets)
{
    const ticketList=[];
    let ticket=tickets
    for(let t of ticket)
    {
        ticketList.push({
            _id:t._id,
            uid:t.uid,
            message:t.message
        })
        //console.log(ticketList)
    }
    
    return ticketList
}


exports.addTicket=(req,res)=>{
   
    const TicketObj={
        uid:req.body.uid,
        message:req.body.message
    }
    const ticket = new Tickets(TicketObj)
    ticket.save((error,resticket)=>{
        if(error) return res.status(400).json({error})
        if(resticket)
        {
            return res.status(200).json({resticket})
        }
    })

}

exports.getTickets=(req,res)=>{
    Tickets.find().
    exec((err,tickets)=>{
        if(err) return res.status(400).json({err})
        if(tickets)
        {
            const ticketList = createTicket(tickets)
            return res.status(200).json({ticketList})
        }
    })
}