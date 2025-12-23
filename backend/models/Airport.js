const mongoose = require("mongoose");

const AirportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          // Indira Gandhi International Airport
    city: { type: String, required: true },          // Delhi
    code: { type: String, required: true, unique: true }, // DEL
    country: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Airport", AirportSchema);
