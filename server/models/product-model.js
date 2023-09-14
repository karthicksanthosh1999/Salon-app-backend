const mongoose = require('mongoose')

const productModel = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    description : {
        type : String,
        require : true
    }
},{timestamps : true})
module.exports = mongoose.model('products',productModel)