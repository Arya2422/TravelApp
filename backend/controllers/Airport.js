const airportService = require("../services/Airport");

exports.searchAirports = async (req, res) => {
  try {
    const { query } = req.query;
    const airports = await airportService.searchAirports(query);
    res.json(airports);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllAirports = async (req, res) => {
  try {
    const airports = await airportService.getAllAirports();
    res.json(airports);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.updateAirport = async (req, res) => {
  try {
    const airport = await airportService.updateAirport(req.params.id, req.body);
    res.json(airport);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAirport = async (req, res) => {
  try {
    const result = await airportService.deleteAirport(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createAirport = async (req, res) => {
  try {
    const airport = await airportService.createAirport(req.body);
    res.status(201).json(airport);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
