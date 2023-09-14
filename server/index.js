const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const product_router = require('./routers/product-router')
const userRouter = require('./routers/user-router')
const bookingRouter = require('./routers/booking-router')
const cookieParser = require('cookie-parser')
const contactRouter = require('./routers/contactRouters')
const mailRouter = require('./routers/mailRouter')

const app = express()


app.use(cors({
    origin:'http://localhost:3000',
    methods: ["GET","PUT","POST","DELETE"], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}));
app.use(express.json())
app.use(cookieParser())

app.use('/api/user',userRouter)
app.use('/api/product',product_router) 
app.use('/api/booking',bookingRouter) 
app.use('/api/contacts',contactRouter) 
app.use('/api/sendmail',mailRouter)

mongoose.connect("mongodb://127.0.0.1:27017/salon")
    .then(()=>{
        app.listen(4000,()=>console.log("DB Connected"));
    })
    .catch(err=>console.log(err))