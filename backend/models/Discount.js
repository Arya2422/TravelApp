const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  description: { type: String },
  type: { type: String, enum: ["percent","fixed"], required: true }, // percent = 10 -> 10% ; fixed = 200 -> Rs200 off
  value: { type: Number, required: true },
  active: { type: Boolean, default: true },
  startAt: { type: Date },
  endAt: { type: Date },
  applicableTo: { type: String, enum: ["all","flight","class"], default: "all" },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: "Flight" }, // optional
  classType: { type: String, enum: ["Economy","Business","First"] } // optional
}, { timestamps: true });

module.exports = mongoose.model("Discount", DiscountSchema);
