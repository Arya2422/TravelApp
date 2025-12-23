// routes/flight.js
const express = require('express');
const router = express.Router();
const flightController = require('../controllers/Flight');
const { protect, permit } = require('../middleware/auth');

// Public routes
router.get('/search', flightController.searchFlights);
router.get('/:id', flightController.getFlight);

// Admin routes
router.post('/create', protect, permit('admin'), flightController.createFlight);
router.put('/:id', protect, permit('admin'), flightController.updateFlight);
router.delete('/:id', protect, permit('admin'), flightController.deleteFlight);
router.get('/', protect, permit('admin'), flightController.listFlights);

module.exports = router;
