import { Router } from "express";
import {
  getOrderCount,
  getProductsCount,
  getSalesByCategory,
  getSalesByDate,
  getTotalSales,
  getUserCount,
} from "../controllers/statisticController.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import verifyJWT from "../utils/jwt.js";
import verifyRoles from "../utils/verifyRoles.js";

const router = Router();

router.get(
  "/total-sales",
  verifyJWT,
  verifyRoles("admin"),
  asyncWrapper(getTotalSales),
);
router.get(
  "/order-count",
  verifyJWT,
  verifyRoles("admin"),
  asyncWrapper(getOrderCount),
);
router.get(
  "/product-count",
  verifyJWT,
  verifyRoles("admin"),
  asyncWrapper(getProductsCount),
);
router.get(
  "/user-count",
  verifyJWT,
  verifyRoles("admin"),
  asyncWrapper(getUserCount),
);
router.get(
  "/sales-by-date",
  verifyJWT,
  verifyRoles("admin"),
  asyncWrapper(getSalesByDate),
);
router.get(
  "/sales-by-category",
  verifyJWT,
  verifyRoles("admin"),
  asyncWrapper(getSalesByCategory),
);

export default router;
