const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema(
  {
    flightNumber: { type: String, required: true, unique: true },
    airline: { type: String, required: true },

    from: {
      airport: { type: mongoose.Schema.Types.ObjectId, ref: "Airport", required: true },
    },
    to: {
      airport: { type: mongoose.Schema.Types.ObjectId, ref: "Airport", required: true },
    },

    departureDate: { type: Date, required: true },
    departureTime: { type: String, required: true },
    arrivalDate: { type: Date, required: true },
    arrivalTime: { type: String, required: true },
    duration: { type: String, required: true },

    tripType: { type: String, enum: ["one-way", "round-trip"], default: "one-way" },

    pricing: {
      economy: { type: Number, required: true },
      business: Number,
      firstClass: Number,
    },

    specialFares: {
      student: { type: Number, default: 0 },
      seniorCitizen: { type: Number, default: 0 },
      armedForces: { type: Number, default: 0 }
    },

    totalSeats: {
      economy: Number,
      business: Number,
      firstClass: Number
    },

    availableSeats: {
      economy: Number,
      business: Number,
      firstClass: Number
    },

    status: {
      type: String,
      enum: ["scheduled", "boarding", "departed", "arrived", "cancelled", "delayed"],
      default: "scheduled"
    },

    stops: { type: Number, default: 0 },        // 0 = Non-stop, 1 = 1-stop, 2 = 2-stops
    freeMeal: { type: Boolean, default: false },


    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flight", FlightSchema);
