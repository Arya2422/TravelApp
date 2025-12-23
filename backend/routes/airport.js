const express = require("express");
const router = express.Router();
const airportController = require("../controllers/Airport");
const { protect, permit } = require('../middleware/auth');

router.get("/search", airportController.searchAirports);
router.post("/create", protect, permit("admin"), airportController.createAirport);
router.put("/:id", protect, permit("admin"), airportController.updateAirport);
router.delete("/:id", protect, permit("admin"), airportController.deleteAirport);

router.get("/", airportController.getAllAirports);

module.exports = router;
