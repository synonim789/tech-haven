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
const verifyJWT = require("../helpers/jwt");
const verifyRoles = require("../helpers/verifyRoles");

router.get("/", verifyJWT, verifyRoles("admin"), getAllOrders);
router.get("/:id", verifyJWT, verifyRoles("admin", "user"), getSingleOrder);
router.post("/", verifyJWT, verifyRoles("admin"), addOrder);
router.put("/:id", verifyJWT, verifyRoles("admin"), updateOrder);
router.delete("/:id", verifyJWT, verifyRoles("admin"), deleteOrder);
router.get("/get/totalsales", verifyJWT, verifyRoles("admin"), getTotalSales);
router.get("/get/count", verifyJWT, verifyRoles("admin"), getOrderCount);

module.exports = router;
