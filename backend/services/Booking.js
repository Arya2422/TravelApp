// services/booking.js
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

exports.createBooking = async (bookingData, userId) => {
  const { flightId, travelClass, numberOfTravellers, specialFareType, passengers } = bookingData;
  
  // Get flight details
  const flight = await Flight.findById(flightId);
  if (!flight) throw new Error('Flight not found');
  
  // Check seat availability
  const availableSeats = flight.availableSeats[travelClass];
  if (availableSeats < numberOfTravellers) {
    throw new Error(`Only ${availableSeats} seats available in ${travelClass} class`);
  }
  
  // Calculate pricing
  let baseFare = flight.pricing[travelClass] * numberOfTravellers;
  let discount = 0;
  
  if (specialFareType !== 'none' && flight.specialFares[specialFareType]) {
    discount = (baseFare * flight.specialFares[specialFareType]) / 100;
  }
  
  const taxes = (baseFare - discount) * 0.18; // 18% tax
  const totalAmount = baseFare - discount + taxes;
  
  // Create booking
  const booking = await Booking.create({
    user: userId,
    flight: flightId,
    passengers,
    travelClass,
    numberOfTravellers,
    specialFareType,
    baseFare,
    discount,
    taxes,
    totalAmount,
    contactEmail: bookingData.contactEmail,
    contactPhone: bookingData.contactPhone
  });
  
  // Update available seats
  flight.availableSeats[travelClass] -= numberOfTravellers;
  await flight.save();
  
  return booking;
};

exports.getBookingById = async (id) => {
  return await Booking.findById(id)
    .populate('user', 'name email')
    .populate('flight');
};

exports.getUserBookings = async (userId, limit = 20, skip = 0) => {
  return await Booking.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .populate('flight');
};

exports.getAllBookings = async (filter = {}, limit = 50, skip = 0) => {
  return await Booking.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .populate('user', 'name email')
    .populate('flight');
};

exports.confirmBooking = async (id, paymentId) => {
  const booking = await Booking.findById(id);
  if (!booking) throw new Error('Booking not found');
  
  booking.status = 'confirmed';
  booking.paymentStatus = 'paid';
  booking.paymentId = paymentId;
  await booking.save();
  
  return booking;
};

exports.cancelBooking = async (id, reason) => {
  const booking = await Booking.findById(id).populate('flight');
  if (!booking) throw new Error('Booking not found');
  
  if (booking.status === 'cancelled') {
    throw new Error('Booking already cancelled');
  }
  
  // Restore seats
  const flight = booking.flight;
  flight.availableSeats[booking.travelClass] += booking.numberOfTravellers;
  await flight.save();
  
  // Calculate refund (80% refund if paid)
  let refundAmount = 0;
  if (booking.paymentStatus === 'paid') {
    refundAmount = booking.totalAmount * 0.8;
  }
  
  booking.status = 'cancelled';
  booking.cancellationReason = reason;
  booking.cancelledAt = new Date();
  booking.refundAmount = refundAmount;
  if (refundAmount > 0) {
    booking.paymentStatus = 'refunded';
  }
  
  await booking.save();
  return booking;
};