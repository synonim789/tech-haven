import { Router } from "express";
import {
  getOrderCount,
  getProductsCount,
  getSalesByCategory,
  getSalesByDate,
  getTotalSales,
  getUserCount,
} from "../controllers/statisticController";
import verifyJWT from "../helpers/jwt";
import verifyRoles from "../helpers/verifyRoles";

const router = Router();

router.get("/total-sales", verifyJWT, verifyRoles("admin"), getTotalSales);
router.get("/order-count", verifyJWT, verifyRoles("admin"), getOrderCount);
router.get("/product-count", verifyJWT, verifyRoles("admin"), getProductsCount);
router.get("/user-count", verifyJWT, verifyRoles("admin"), getUserCount);
router.get("/sales-by-date", verifyJWT, verifyRoles("admin"), getSalesByDate);
router.get(
  "/sales-by-category",
  verifyJWT,
  verifyRoles("admin"),
  getSalesByCategory,
);

export default router;
