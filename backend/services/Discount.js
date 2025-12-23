const Discount = require("../models/Discount");

exports.createDiscount = async (data) => await Discount.create(data);
exports.getDiscountByCode = async (code) => {
  const now = new Date();
  return Discount.findOne({
    code,
    active: true,
    $or: [{ startAt: null }, { startAt: { $lte: now } }],
    $or: [{ endAt: null }, { endAt: { $gte: now } }]
  });
};
exports.listDiscounts = async (query) => {
  // simple list with pagination could be added; for brevity:
  return Discount.find({});
};
exports.updateDiscount = async (id, data) => await Discount.findByIdAndUpdate(id, data, { new: true });
exports.deleteDiscount = async (id) => await Discount.findByIdAndDelete(id);
