const express = require('express');
const { signUp, login, adminDetails, verifyUser, userLogout, getAllUser } = require('../controllers/userContoller');

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', login)
userRouter.get('/adminDetails',verifyUser,adminDetails)
userRouter.get('/logout',userLogout)
userRouter.get('/getalluser',getAllUser)

module.exports = userRouter;