const express = require("express");
const router = express.Router();
const stationController = require("../controllers/station");
const { protect, permit } = require("../middleware/auth");

// ADMIN ONLY
router.post("/", protect, permit("admin"), stationController.createStation);
router.put("/:id", protect, permit("admin"), stationController.updateStation);
router.delete("/:id", protect, permit("admin"), stationController.deleteStation);

// PUBLIC
router.get("/", stationController.getStations);
router.get("/search", stationController.searchStations);
router.get("/:id", stationController.getStationById);

module.exports = router;
