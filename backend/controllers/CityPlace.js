const cityPlaceService = require("../services/CityPlce");

exports.getCityPlaces = async (req, res) => {
  try {
    const { city, type } = req.query;
    if (!city) throw new Error("City is required");

    const places = await cityPlaceService.getPlacesByCity(city, type);
    res.json(places);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createCityPlace = async (req, res) => {
  try {
    const place = await cityPlaceService.createPlace(req.body);
    res.status(201).json(place);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
