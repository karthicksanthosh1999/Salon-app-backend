const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({

    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    message: {
        type :String,
        require: true
    }
})

module.exports = mongoose.model('contacts', contactSchema)