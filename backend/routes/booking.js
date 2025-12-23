const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/Booking');
const { protect, permit } = require('../middleware/auth');

// User routes
router.post('/booking', protect, bookingController.createBooking);
router.get('/my-bookings', protect, bookingController.getMyBookings);
router.get('/:id', protect, bookingController.getBooking);
router.post('/:id/confirm', protect, bookingController.confirmBooking);
router.post('/:id/cancel', protect, bookingController.cancelBooking);

// Admin routes
router.get('/', protect, permit('admin'), bookingController.getAllBookings);

module.exports = router;