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
} = require("../controllers/productController");
const storage = require("../config/multerStorage");

const uploadOptions = multer({ storage: storage });

router.get(`/`, getAllProducts);
router.get("/:id", getSingleProduct);
router.post(
  `/`,
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
  addProduct,
);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/get/count", getProductsCount);
router.get("/get/featured/:count", getFeaturedCount);

module.exports = router;
