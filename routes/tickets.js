const express = require('express')
const { requireSignin,adminMiddleware,userMiddleware} = require('../middleware')

const { addTicket,getTickets } = require('../controllers/tickets')
const router = express.Router()
router.post('/ticket/create',requireSignin,userMiddleware,addTicket)
router.get('/ticket/gettickets',requireSignin,adminMiddleware,getTickets)
module.exports = router
