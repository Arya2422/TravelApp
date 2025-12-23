const Airport = require('../models/Airport');
const Flight = require('../models/Flight');
const CityPlace = require('../models/CityPlace'); 

exports.searchFlights = async (filters) => {
  const { 
    from, 
    to, 
    departureDate,
    minPrice,
    maxPrice,
    airlines,
    stops,
    freeMeal,
    timeSlot
  } = filters;

  const fromAirport = await Airport.findOne({ code: from.toUpperCase() });
  const toAirport = await Airport.findOne({ code: to.toUpperCase() });

  if (!fromAirport || !toAirport) {
    throw new Error("Invalid airport code");
  }

  let query = {
    "from.airport": fromAirport._id,
    "to.airport": toAirport._id,
    departureDate: {
      $gte: new Date(departureDate),
      $lte: new Date(new Date(departureDate).setHours(23, 59, 59)),
    },
  };

  // ⭐ Price filter
  if (minPrice || maxPrice) {
    query["pricing.economy"] = {};
    if (minPrice) query["pricing.economy"].$gte = Number(minPrice);
    if (maxPrice) query["pricing.economy"].$lte = Number(maxPrice);
  }

  // ⭐ Airline filter
  if (airlines) {
    query.airline = { $in: airlines.split(",") };
  }

  // ⭐ Stops filter
  if (stops) {
    query.stops = { $in: stops.split(",").map(Number) };
  }

  // ⭐ Free meal filter
  if (freeMeal === "true") {
    query.freeMeal = true;
  }

  // ⭐ Time Slot filter
  if (timeSlot) {
    const timeConditions = {
      before6: { $lt: "06:00" },
      morning: { $gte: "06:00", $lt: "12:00" },
      afternoon: { $gte: "12:00", $lt: "18:00" },
      after6: { $gte: "18:00" }
    };
    query.departureTime = timeConditions[timeSlot];
  }

  // ✈️ Fetch flights
  const flights = await Flight.find(query)
    .populate("from.airport to.airport");

  // 🌆 DESTINATION CITY HIGHLIGHTS
  const destinationCity = toAirport.city;

  const [hotels, attractions, famousPlaces] = await Promise.all([
    CityPlace.find({ city: destinationCity, type: "hotel" })
      .sort({ rating: -1 })
      .limit(5),

    CityPlace.find({ city: destinationCity, type: "attraction" })
      .sort({ isPopular: -1, rating: -1 })
      .limit(5),

    CityPlace.find({ city: destinationCity, type: "famous-place" })
      .sort({ isPopular: -1 })
      .limit(5)
  ]);

  // ✅ FINAL RESPONSE
  return {
    flights,
    destination: {
      city: destinationCity,
      hotels,
      attractions,
      famousPlaces
    }
  };
};


exports.createFlight = async (flightData, adminId) => {
  // Set available seats equal to total seats initially
  flightData.availableSeats = { ...flightData.totalSeats };
  flightData.createdBy = adminId;
  
  const flight = await Flight.create(flightData);
  return flight;
};

exports.getFlightById = async (id) => {
  return await Flight.findById(id);
};

exports.updateFlight = async (id, updates) => {
  const flight = await Flight.findByIdAndUpdate(id, updates, { 
    new: true, 
    runValidators: true 
  });
  
  if (!flight) throw new Error('Flight not found');
  return flight;
};

exports.deleteFlight = async (id) => {
  const flight = await Flight.findById(id);
  if (!flight) throw new Error('Flight not found');
  
  // Check if there are any bookings
  const Booking = require('../models/Booking');
  const bookingCount = await Booking.countDocuments({ 
    flight: id, 
    status: { $in: ['pending', 'confirmed'] } 
  });
  
  if (bookingCount > 0) {
    throw new Error('Cannot delete flight with active bookings');
  }
  
  await Flight.findByIdAndDelete(id);
  return { message: 'Flight deleted successfully' };
};

// services/Flight.js
exports.getFlightByIdWithPlaces = async (id) => {
  // Get flight and populate airports
  const flight = await Flight.findById(id).populate("from.airport to.airport");
  if (!flight) throw new Error("Flight not found");

  // Get destination city
  const destinationCity = flight.to.airport.city;

  // Fetch top 5 hotels, attractions, famous places
  const [hotels, attractions, famousPlaces] = await Promise.all([
    CityPlace.find({ city: destinationCity, type: "hotel" }).sort({ rating: -1 }).limit(5),
    CityPlace.find({ city: destinationCity, type: "attraction" }).sort({ isPopular: -1, rating: -1 }).limit(5),
    CityPlace.find({ city: destinationCity, type: "famous-place" }).sort({ isPopular: -1 }).limit(5),
  ]);

  return {
    flight,
    destination: {
      city: destinationCity,
      hotels,
      attractions,
      famousPlaces
    }
  };
};


exports.getAllFlights = async (filter = {}, limit = 50, skip = 0) => {
  return await Flight.find(filter)
    .sort({ departureDate: 1, departureTime: 1 })
    .limit(limit)
    .skip(skip)
    .populate('createdBy', 'name email');
};
