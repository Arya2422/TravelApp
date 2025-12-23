const express = require("express");
const router = express.Router();
const cityPlaceController = require("../controllers/CityPlace");

router.get("/", cityPlaceController.getCityPlaces);
router.post("/", cityPlaceController.createCityPlace);

module.exports = router;
