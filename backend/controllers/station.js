const stationService = require("../services/station");

// Create station
exports.createStation = async (req, res) => {
  try {
    const station = await stationService.createStation(req.body);
    res.status(201).json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all stations
exports.getStations = async (req, res) => {
  try {
    const stations = await stationService.getStations();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get by ID
exports.getStationById = async (req, res) => {
  try {
    const station = await stationService.getStationById(req.params.id);
    res.json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
exports.updateStation = async (req, res) => {
  try {
    const updated = await stationService.updateStation(
      req.params.id,
      req.body
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete
exports.deleteStation = async (req, res) => {
  try {
    await stationService.deleteStation(req.params.id);
    res.json({ message: "Station deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search stations (by name / code / city)
exports.searchStations = async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ message: "Query q is required" });

    const results = await stationService.searchStations(q);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
