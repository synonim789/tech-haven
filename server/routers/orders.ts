import { Router } from "express";
import {
  addOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
} from "../controllers/orderController";
import verifyJWT from "../utils/jwt";
import verifyRoles from "../utils/verifyRoles";
const router = Router();

router.post("/", verifyJWT, verifyRoles("admin", "user"), addOrder);
router.get("/", verifyJWT, verifyRoles("admin"), getAllOrders);
router.put("/:id", verifyJWT, verifyRoles("admin"), updateOrder);
router.get("/:id", verifyJWT, verifyRoles("admin", "user"), getSingleOrder);
router.delete("/:id", verifyJWT, deleteOrder);

export default router;
