const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    fname : {
        require : true,
        type : String
    },
    lname :{
        require :true,
        type : String
    },
    mobile : {
        require : true,
        type : String
    },
    email : {
        require : true,
        type : String,
        unique :true
    },
    password : {
        require : true,
        type : String,
        unique :true
    },
    role : {
        default : 'visitor',
        type : String 
    }
})

module.exports = mongoose.model('User',userModel)