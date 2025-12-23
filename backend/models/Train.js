const mongoose = require("mongoose");

const TrainSchema = new mongoose.Schema(
  {
    trainNumber: { type: String, required: true, unique: true },
    trainName: { type: String, required: true },

    from: {
      stationCode: { type: String, required: true },
      stationName: { type: String, required: true },
    },

    to: {
      stationCode: { type: String, required: true },
      stationName: { type: String, required: true },
    },

    departureDate: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalDate: { type: String, required: true },
    arrivalTime: { type: String, required: true },

    trainType: {
      type: String,
      enum: ["Express", "Superfast", "Passenger"],
      default: "Express",
    },

    classes: {
      sleeper: { price: Number, seatsAvailable: Number },
      ac3: { price: Number, seatsAvailable: Number },
      ac2: { price: Number, seatsAvailable: Number },
      ac1: { price: Number, seatsAvailable: Number },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Train", TrainSchema);
