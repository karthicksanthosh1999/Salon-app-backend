const Model = require('../models/contactModel')

const postContacts = async (req, res) => {
    const { firstname, lastname, email, mobile, message } = req.body;
    let contacts;
    try {

        contacts = new Model({ firstname, lastname, email, mobile, message });
        contacts = await contacts.save()

    } catch (error) {
        return console.log(error)
    }
    if (!contacts) {
        return res.status(404).json({ err: 'user not created' })
    }
    return res.status(201).json({ contacts })

}

const getAllContacts = async (req,res) =>{
    let contacts;
    try {
        contacts = await Model.find()
    } catch (error) {
        return res.status(404).json(error)
    }
    if (!contacts) {
        return res.status(404).json({ err: 'user not created' })
    }
    return res.status(201).json({ contacts })

}

const getSignleContacts = async (req,res)=>{
    const {id} = req.params
    let contacts;
    try {
        contacts =await Model.findById(id)
    } catch (error) {
        return res.status(404).json(error)
    }
    if(!contacts){
        return res.status(404).json({message : 'No Contacts'})
    }
    return res.status(200).json({contacts})
}

module.exports = {
    postContacts, getAllContacts, getSignleContacts
}