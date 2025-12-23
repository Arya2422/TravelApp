const flightService = require('../services/Flight');

exports.searchFlights = async (req, res) => {
  try {
    const flights = await flightService.searchFlights(req.query);
    res.json(flights);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createFlight = async (req, res) => {
  try {
    const flight = await flightService.createFlight(req.body, req.user.id);
    res.status(201).json(flight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFlight = async (req, res) => {
  try {
    const data = await flightService.getFlightByIdWithPlaces(req.params.id);
    res.json(data); // Returns flight + destination places
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateFlight = async (req, res) => {
  try {
    const flight = await flightService.updateFlight(req.params.id, req.body);
    res.json(flight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteFlight = async (req, res) => {
  try {
    const result = await flightService.deleteFlight(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listFlights = async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    const flights = await flightService.getAllFlights({}, Number(limit), Number(skip));
    res.json(flights);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};