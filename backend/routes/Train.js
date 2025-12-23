const express = require("express");
const router = express.Router();
const trainController = require("../controllers/Train");
const { protect, permit } = require("../middleware/auth");

// PUBLIC — Search trains
router.get("/search-trains", trainController.searchTrains);

// Get train by ID
router.get("/:id", trainController.getTrainById);

// ADMIN ONLY
router.post("/", protect, permit("admin"), trainController.createTrain);
router.put("/:id", protect, permit("admin"), trainController.updateTrain);
router.delete("/:id", protect, permit("admin"), trainController.deleteTrain);
// ADMIN ONLY - Get all trains
router.get("/", protect, permit("admin"), trainController.getAllTrains);

module.exports = router;
