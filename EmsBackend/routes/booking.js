const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/auth'); // Protect routes

router.post('/', authMiddleware, bookingController.createBooking);
router.get('/', authMiddleware, bookingController.getUserBookings);
router.patch('/:id/cancel', authMiddleware, bookingController.cancelBooking);

module.exports = router;
