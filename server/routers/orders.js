const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getSingleOrder,
  addOrder,
  deleteOrder,
  getTotalSales,
  getOrderCount,
  updateOrder,
} = require("../controllers/orderController");

router.get("/", getAllOrders);
router.get("/:id", getSingleOrder);
router.post("/", addOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/get/totalsales", getTotalSales);
router.get("/get/count", getOrderCount);

module.exports = router;
