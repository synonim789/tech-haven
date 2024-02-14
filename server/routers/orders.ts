import { Router } from "express";
import {
  addOrder,
  deleteOrder,
  getAllOrders,
  getOrderCount,
  getSingleOrder,
  getTotalSales,
  updateOrder,
} from "../controllers/orderController";
import verifyJWT from "../helpers/jwt";
import verifyRoles from "../helpers/verifyRoles";
const router = Router();

router.post("/", verifyJWT, verifyRoles("admin", "user"), addOrder);
router.get("/", verifyJWT, verifyRoles("admin"), getAllOrders);
router.put("/:id", verifyJWT, verifyRoles("admin"), updateOrder);
router.get("/:id", verifyJWT, verifyRoles("admin", "user"), getSingleOrder);
router.delete("/:id", verifyJWT, verifyRoles("admin"), deleteOrder);
router.get("/get/totalsales", verifyJWT, verifyRoles("admin"), getTotalSales);
router.get("/get/count", verifyJWT, verifyRoles("admin"), getOrderCount);

export default router;
