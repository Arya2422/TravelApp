const trainService = require("../services/Train");

// Search trains
exports.searchTrains = async (req, res) => {
  try {
    const { from, to, departureDate } = req.query;

    if (!from || !to || !departureDate) {
      return res
        .status(400)
        .json({ message: "from, to, departureDate required" });
    }

    const trains = await trainService.searchTrains({
      from,
      to,
      departureDate,
    });

    res.json({ count: trains.length, trains });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Train
exports.createTrain = async (req, res) => {
  try {
    const train = await trainService.createTrain(req.body);
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Train
exports.updateTrain = async (req, res) => {
  try {
    const updated = await trainService.updateTrain(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Train
exports.deleteTrain = async (req, res) => {
  try {
    await trainService.deleteTrain(req.params.id);
    res.json({ message: "Train deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Train by ID
exports.getTrainById = async (req, res) => {
  try {
    const train = await trainService.getTrainById(req.params.id);
    res.json(train);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllTrains = async (req, res) => {
  try {
    const trains = await trainService.getAllTrains();
    res.json(trains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};