const mongoose = require('mongoose')

const product = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    price  : Number,
    description : String
})

const bookingModel = new mongoose.Schema({

    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
        require: true
    },
    products: [product],
    date: {
        type: Date,
        require: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    }

}, { timestamps: true })

module.exports = mongoose.model("booking", bookingModel)