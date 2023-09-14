const {newBooking,updateBooking,singleProducts,getAllBookings} = require('../controllers/bookingController')
const express = require('express')

const router = express.Router()

router.post('/',newBooking)
router.put('/:id',updateBooking)
router.get('/:id',singleProducts)
router.get('/',getAllBookings)


module.exports = router;

