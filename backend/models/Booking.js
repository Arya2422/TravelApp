const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    bookingReference: { 
      type: String, 
      required: true, 
      unique: true,
      default: () => 'BK' + Date.now() + Math.random().toString(36).substr(2, 6).toUpperCase()
    },
    
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    
    flight: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Flight', 
      required: true 
    },
    
    // Passenger Details
    passengers: [{
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      age: { type: Number, required: true },
      gender: { type: String, enum: ['male', 'female', 'other'], required: true },
      seatNumber: { type: String }
    }],
    
    // Booking Details
    travelClass: { 
      type: String, 
      enum: ['economy', 'business', 'firstClass'], 
      required: true 
    },
    
    numberOfTravellers: { type: Number, required: true },
    
    specialFareType: { 
      type: String, 
      enum: ['none', 'student', 'seniorCitizen', 'armedForces'], 
      default: 'none' 
    },
    
    // Pricing
    baseFare: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    taxes: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    
    // Contact Info
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    
    // Status
    status: { 
      type: String, 
      enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
      default: 'pending' 
    },
    
    paymentStatus: { 
      type: String, 
      enum: ['pending', 'paid', 'refunded'], 
      default: 'pending' 
    },
    
    paymentId: { type: String },
    
    // Cancellation
    cancellationReason: { type: String },
    cancelledAt: { type: Date },
    refundAmount: { type: Number }
  },
  { timestamps: true }
);

// Index for faster queries
BookingSchema.index({ user: 1, createdAt: -1 });
BookingSchema.index({ bookingReference: 1 });
BookingSchema.index({ flight: 1 });

module.exports = mongoose.model('Booking', BookingSchema);
