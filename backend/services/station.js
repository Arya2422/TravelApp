const Station = require("../models/station");

exports.createStation = async (data) => {
  return await Station.create(data);
};

exports.getStations = async () => {
  return await Station.find();
};

exports.getStationById = async (id) => {
  return await Station.findById(id);
};

exports.updateStation = async (id, data) => {
  return await Station.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteStation = async (id) => {
  return await Station.findByIdAndDelete(id);
};

exports.searchStations = async (query) => {
  return await Station.find({
    $or: [
      { stationName: { $regex: query, $options: "i" } },
      { stationCode: { $regex: query, $options: "i" } },
      { city: { $regex: query, $options: "i" } },
    ],
  });
};
