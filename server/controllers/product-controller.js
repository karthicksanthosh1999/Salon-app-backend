const { default: mongoose } = require('mongoose');
const Product = require('../models/product-model')

const addProduct = async (req, res) => {
    const { name, price, description } = req.body
    let product;
    try {
        product = await new Product({ name, price, description });
        product = await product.save()
    } catch (error) {
        return console.log(error)
    }
    if (!product) {
        return res.status(404).json({ message: "Something Went Wrong" })
    }
    return res.status(201).json({ product })


}

const getProduct = async (req, res) => {
    let product;
    try {
        product = await Product.find();
    } catch (error) {
        return console.log(error)
    }
    if (!product) {
        return res.status(404).json({ message: "Product Not Found" })
    }
    return res.status(200).json({ product })
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    let product;
    try {
        product = await Product.findByIdAndDelete(id);
    } catch (error) {
        return console.log(error);
    }
    if (!mongoose.Types.ObjectId.isValid({ id })) {
        return res.status(404).json({ error: "Product Not found" });
    }
    return res.status(200).json(product);
}

const updateProduct = async (req, res) => {
    const id = req.params.id
    let product
    try {
        product = await Product.findByIdAndUpdate(id,req.body,{new : true})
    } catch (error) {
        return res.status(404).json({ error: "User Not Found" })
    }
    if (!product) {
        return res.status(400).json({ message: "User doesn't updated" })
    }
    return res.status(201).json(product)
}

const getUserById = async (req,res)=>{
    const {id} = req.params;
    let product;
    try {
        product = await  Product.findById(id)
    } catch (error) {
        return console.log(error);
    }
    if(!product){
        return res.status(404).json({error:"Product not found"})
    }
    return res.status(200).json({product})
}

module.exports = {
    addProduct, getProduct, deleteProduct, updateProduct, getUserById
}