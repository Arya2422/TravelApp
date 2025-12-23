const mongoose = require("mongoose");

const CityPlaceSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["hotel", "attraction", "famous-place", "restaurant"],
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: String,

    rating: {
      type: Number,
      min: 0,
      max: 5,
    },

    priceRange: String, // ₹₹₹, ₹₹, etc (for hotels/restaurants)

    address: String,

    images: [String],

    location: {
      lat: Number,
      lng: Number,
    },

    isPopular: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CityPlace", CityPlaceSchema);
