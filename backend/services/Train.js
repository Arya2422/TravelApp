const Train = require("../models/Train");

exports.createTrain = async (data) => {
  return await Train.create(data);
};

exports.getTrainById = async (id) => {
  return await Train.findById(id);
};

// Get all trains
exports.getAllTrains = async () => {
  return await Train.find(); // returns all trains
};

exports.updateTrain = async (id, data) => {
  return await Train.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteTrain = async (id) => {
  return await Train.findByIdAndDelete(id);
};

// Search trains by from/to/departureDate
exports.searchTrains = async ({ from, to, departureDate }) => {
  return await Train.find({
    "from.stationCode": from,
    "to.stationCode": to,
    departureDate,
  });
};
