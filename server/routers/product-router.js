const express = require('express')
const {addProduct, getProduct, deleteProduct, updateProduct, getUserById} = require('../controllers/product-controller')

const router = express.Router()

router.post('/postProduct',addProduct)
router.get('/getProduct',getProduct)
router.delete('/:id',deleteProduct)
router.put('/:id',updateProduct)
router.get('/:id', getUserById) 

module.exports = router;