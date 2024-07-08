import { Router } from "express";
import {
  addOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
} from "../controllers/orderController";
import { asyncWrapper } from "../utils/asyncWrapper";
import verifyJWT from "../utils/jwt";
import verifyRoles from "../utils/verifyRoles";
const router = Router();

router.post(
  "/",
  verifyJWT,
  verifyRoles("admin", "user"),
  asyncWrapper(addOrder),
);
router.get("/", verifyJWT, verifyRoles("admin"), asyncWrapper(getAllOrders));
router.put("/:id", verifyJWT, verifyRoles("admin"), asyncWrapper(updateOrder));
router.get(
  "/:id",
  verifyJWT,
  verifyRoles("admin", "user"),
  asyncWrapper(getSingleOrder),
);

export default router;
