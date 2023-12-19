const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAllProducts,
  getSingleProduct,
  getProductsCount,
  getFeaturedCount,
  deleteProduct,
  addProduct,
  updateProduct,
  getFeaturedProducts,
} = require("../controllers/productController");
const storage = require("../config/multerStorage");
const verifyJWT = require("../helpers/jwt");
const verifyRoles = require("../helpers/verifyRoles");

const uploadOptions = multer({ storage: storage });

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
router.get("/get/count", verifyJWT, verifyRoles("admin"), getProductsCount);
router.get(
  "/get/featured/:count",
  verifyJWT,
  verifyRoles("admin"),
  getFeaturedCount,
);
router.get("/get/featured-products", getFeaturedProducts);

module.exports = router;
