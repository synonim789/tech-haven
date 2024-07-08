import { Router } from "express";
import multer from "multer";
import storage from "../config/multerStorage";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedCount,
  getFeaturedProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController";
import verifyJWT from "../utils/jwt";
import verifyRoles from "../utils/verifyRoles";

const router = Router();

const uploadOptions = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.get(`/`, getAllProducts);
router.get("/:id", getSingleProduct);
router.post(
  `/`,
  verifyJWT,

  uploadOptions.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 10,
    },
  ]),
  verifyRoles("admin"),
  addProduct,
);
router.put("/:id", verifyJWT, verifyRoles("admin"), updateProduct);
router.delete("/:id", verifyJWT, verifyRoles("admin"), deleteProduct);

router.get(
  "/get/featured/:count",
  verifyJWT,
  verifyRoles("admin"),
  getFeaturedCount,
);
router.get("/get/featured-products", getFeaturedProducts);

export default router;
