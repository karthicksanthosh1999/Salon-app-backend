const express = require('express')
const { getAllContacts, postContacts, getSignleContacts } = require('../controllers/contactController')

const contactRouter = express.Router()

contactRouter.post('/', postContacts)
contactRouter.get('/:id', getSignleContacts)
contactRouter.get('/', getAllContacts) 

module.exports = contactRouter;