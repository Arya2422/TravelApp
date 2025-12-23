const Airport = require("../models/Airport");

exports.createAirport = async (data) => {
  const existing = await Airport.findOne({ code: data.code.toUpperCase() });
  if (existing) throw new Error("Airport with this code already exists");

  data.code = data.code.toUpperCase();

  const airport = await Airport.create(data);
  return airport;
};

exports.updateAirport = async (id, updates) => {
  const airport = await Airport.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  if (!airport) throw new Error("Airport not found");
  return airport;
};

exports.deleteAirport = async (id) => {
  const airport = await Airport.findByIdAndDelete(id);
  if (!airport) throw new Error("Airport not found");
  return { message: "Airport deleted successfully" };
};


exports.searchAirports = async (query) => {
  return await Airport.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { city: { $regex: query, $options: "i" } },
      { code: { $regex: query, $options: "i" } }
    ]
  })
    .limit(10)
    .sort({ city: 1 });
};


exports.getAllAirports = async () => {
  return await Airport.find().sort({ city: 1 });
};