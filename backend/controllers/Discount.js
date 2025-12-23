const discountService = require("../services/Discount");

exports.create = async (req, res) => {
  try {
    const d = await discountService.createDiscount(req.body);
    res.status(201).json(d);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.list = async (req, res) => {
  try {
    const items = await discountService.listDiscounts(req.query);
    res.json(items);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.getByCode = async (req, res) => {
  try {
    const d = await discountService.getDiscountByCode(req.params.code);
    if (!d) return res.status(404).json({ message: "Not found or inactive" });
    res.json(d);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const d = await discountService.updateDiscount(req.params.id, req.body);
    res.json(d);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.delete = async (req, res) => {
  try {
    await discountService.deleteDiscount(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { res.status(400).json({ message: err.message }); }
};
