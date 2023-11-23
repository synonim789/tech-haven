const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  getSingleCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const verifyJWT = require("../helpers/jwt");
const verifyRoles = require("../helpers/verifyRoles");

router.get("/", getAllCategories);
router.get("/:id", getSingleCategory);
router.post("/", verifyJWT, verifyRoles("admin"), addCategory);
router.put("/:id", verifyJWT, verifyRoles("admin"), updateCategory);
router.delete("/:id", verifyJWT, verifyRoles("admin"), deleteCategory);

module.exports = router;
