const express = require('express')
const {mailController} = require('../controllers/sendEmail')

const mailRouter = express.Router()

mailRouter.post('/mail',mailController)

module.exports = mailRouter;