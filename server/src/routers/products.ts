import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedCount,
  getFeaturedProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import verifyJWT from "../utils/jwt.js";
import verifyRoles from "../utils/verifyRoles.js";

const router = Router();

router.get(`/`, asyncWrapper(getAllProducts));
router.get("/:id", asyncWrapper(getSingleProduct));
router.post(`/`, verifyJWT, verifyRoles("admin"), asyncWrapper(addProduct));
router.put(
  "/:id",
  verifyJWT,
  verifyRoles("admin"),
  asyncWrapper(updateProduct),
);
router.delete(
  "/:id",
  verifyJWT,
  verifyRoles("admin"),
  asyncWrapper(deleteProduct),
);

router.get(
  "/get/featured/:count",
  verifyJWT,
  verifyRoles("admin"),
  asyncWrapper(getFeaturedCount),
);
router.get("/get/featured-products", asyncWrapper(getFeaturedProducts));

export default router;
