const CityPlace = require("../models/CityPlace");

exports.getPlacesByCity = async (city, type) => {
  const query = { city };

  if (type) {
    query.type = type; // hotel / attraction / famous-place
  }

  return await CityPlace.find(query)
    .sort({ isPopular: -1, rating: -1 })
    .limit(10);
};

exports.createPlace = async (data) => {
  return await CityPlace.create(data);
};
