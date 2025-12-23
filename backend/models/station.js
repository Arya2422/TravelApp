const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
  stationCode: { type: String, required: true, unique: true },
  stationName: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Station", StationSchema);