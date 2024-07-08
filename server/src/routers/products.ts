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
import { asyncWrapper } from "../utils/asyncWrapper";
import verifyJWT from "../utils/jwt";
import verifyRoles from "../utils/verifyRoles";

const router = Router();

const uploadOptions = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.get(`/`, asyncWrapper(getAllProducts));
router.get("/:id", asyncWrapper(getSingleProduct));
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
  asyncWrapper(addProduct),
);
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
