const bookingService = require('../services/Booking');

exports.createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body, req.user.id);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    
    // Users can only view their own bookings
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const { limit = 20, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    const bookings = await bookingService.getUserBookings(req.user.id, Number(limit), Number(skip));
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    const bookings = await bookingService.getAllBookings({}, Number(limit), Number(skip));
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.confirmBooking = async (req, res) => {
  try {
    const { paymentId } = req.body;
    const booking = await bookingService.confirmBooking(req.params.id, paymentId);
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { reason } = req.body;
    const booking = await bookingService.cancelBooking(req.params.id, reason);
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};