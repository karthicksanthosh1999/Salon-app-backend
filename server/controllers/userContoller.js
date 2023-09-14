const Model = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
    const { fname, lname, email, mobile, password } = req.body;
    let user;
    try {
        const hash = await bcrypt.hashSync(password, 10)
        user = new Model({ fname, lname, email, mobile, password: hash });
        user = await user.save()
    } catch (error) {
        return console.log(error)
    }
    if (!user) {
        return res.status(404).json({ err: 'user not created' })
    }
    return res.status(201).json({ user })

}

const login = async (req, res) => {
    const { email, password } = req.body
    let existingUser;
    try {
        existingUser = await Model.findOne({ email })
    } catch (error) {
        return console.log(error)
    }

    if(!email || !password){
        return res.json({message: 'Please fill the all required fields'})
    }

    

    if (!existingUser) {
        return res.json({ message: 'user not found' })
    }
    const validUser = bcrypt.compareSync(password, existingUser.password)
    if (!validUser) {
        return res.json({ message: "Password is incorrect" })
    }
    const token = jwt.sign({ id: existingUser._id, role: existingUser.role,lname: existingUser.lname ,fname: existingUser.fname,mobile : existingUser.mobile, email :existingUser.email }, 'jwtkey', { expiresIn: '1d' });
    res.cookie('token',token)
    return res.json({ Status: "Authendication Completed", token, id: existingUser._id, role: existingUser.role, name: existingUser.fname, mobile: existingUser.mobile, email : existingUser.email })
}

const verifyUser = (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({error : "Your not a authorizaed"})
    }else{
        jwt.verify(token,'jwtkey',(err,decode)=>{
            if (err) {
                return res.json({error : "Token is not ok"})
            } else {
                req.fname = decode.fname;
                req.lname = decode.lname;
                req.email = decode.email;
                req.role = decode.role;
                req.mobile = decode.mobile
                next()
            }
        })
    }
}

const adminDetails = async(req,res) =>{
    return res.json({Status : "Success" , fname : req.fname ,lname : req.lname ,role : req.role, mobile : req.mobile, email : req.email })
}

const userLogout = (req,res) =>{
    res.clearCookie('token');
    return res.json({Status : "Success"})
}

const getAllUser = async(req,res)=>{
    let user;
    try {
        user = await Model.find()
    } catch (error) {
        return res.json(error)
    }
    if(!user){
        return res.json({error : "User Not Found"})
    }
    return res.json({user})
}

module.exports = {
    signUp, login, verifyUser, adminDetails, userLogout, getAllUser
}