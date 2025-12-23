const express = require("express");
const router = express.Router();
const discountCtrl = require("../controllers/discountController");
const auth = require("../middleware/auth");
const admin = require("../middleware/auth");

// Admin manage discounts
router.post("/discounts", auth, admin, discountCtrl.create);
router.get("/discounts", auth, admin, discountCtrl.list);
router.get("/discounts/:code", auth, admin, discountCtrl.getByCode);
router.put("/discounts/:id", auth, admin, discountCtrl.update);
router.delete("/discounts/:id", auth, admin, discountCtrl.delete);

module.exports = router;
