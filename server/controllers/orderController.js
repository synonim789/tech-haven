const asyncHandler = require("express-async-handler");
const Order = require("../models/order");
const mongoose = require("mongoose");

const getAllOrders = asyncHandler(async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });
  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.status(200).json(orderList);
});

const updateOrder = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid Order ID" });
  }
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true },
  );
  if (!order) {
    return res.status(404).json({ message: "The order cannot be updated!" });
  }
  res.status(200).json(order);
});

const deleteOrder = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid order ID" });
  }
  Order.findByIdAndRemove(req.params.id);
});

const getTotalSales = asyncHandler(async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: "total" } } },
  ]);

  if (!totalSales) {
    return res
      .status(400)
      .json({ message: "The order sales cannot be generated" });
  }

  res.status(200).json({ totalSales: totalSales.pop().totalSales });
});

const getOrderCount = asyncHandler(async (req, res) => {
  const orderCount = await Order.countDocuments()
    .then((count) => count)
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });

  if (!orderCount) {
    return res.status(500).json({ success: false });
  }

  res.status(200).json({
    count: orderCount,
  });
});

module.exports = {
  getAllOrders,
  updateOrder,
  deleteOrder,
  getTotalSales,
  getOrderCount,
};
