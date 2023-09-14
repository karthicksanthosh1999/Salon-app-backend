const Model = require('../models/bookingModel')

const newBooking = async(req,res)=>{
    const {fname,lname,email,mobile,date,products,status,total} = req.body  
    let availableDate;
    const existingdate = await Model.findOne({date})
        if(existingdate){
            return res.json({message : "Date is available"})
        }
        
        try { 
            availableDate = await new Model({
                fname,
                lname,
                email,
                mobile,
                products,
                date : new Date(`${date}`),
                total,
                status
            }) 
            availableDate = await availableDate.save()
            
        } catch (error) {
            return console.log(error)
        }
        return res.json({Status: "success"})
               
}

const getAllBookings = async(req,res)=>{
    let product
    try {
        product = await Model.find()
    } catch (error) {
        return console.log(error)
    }
    if(!product){
        return res.status(404).json({message : "Product not found"})
    }
    return res.status(200).json({product})
}

const singleProducts = async(req,res)=>{
    const {id} = req.params; 
    let product
    try {
        product = await Model.findById(id)
    } catch (error) { 
        return console.log(error);
    }
        if(!product){
        return res.json({message : "product not found"})
    }
    return res.json({product})
}

const updateBooking = async(req,res)=>{
    const {id} = req.params;
    let product
    try {
        product = await Model.findByIdAndUpdate(id,req.body,{new : true})
    } catch (error) {
        return res.status(404).json(error)
    }
    if(!product){
        return res.json({ message : "product not found"})
    }
    return res.json({product})
}

module.exports = {
    newBooking, updateBooking, singleProducts, getAllBookings
}