import { Router } from "express";
import {
  addOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
} from "../controllers/orderController.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import verifyJWT from "../utils/jwt.js";
import verifyRoles from "../utils/verifyRoles.js";
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
