const express = require("express");
const {
  getAllUser,
  addUser,
  getUser,
  loginUser,
  signUpUser,
  getUserCount,
  deleteUser,
  userForgotPassword,
  updateUser,
  changeUserRole,
} = require("../controllers/userController");
const verifyJWT = require("../helpers/jwt");
const verifyRoles = require("../helpers/verifyRoles");
const router = express.Router();

router.get("/", verifyJWT, verifyRoles("admin"), getAllUser);
router.post("/", addUser);
router.get("/:id", verifyJWT, verifyRoles("admin", "user"), getUser);
router.post("/login", loginUser);
router.post("/sign-up", signUpUser);
router.get("/get/count", verifyJWT, verifyRoles("admin"), getUserCount);
router.delete("/:id", verifyJWT, verifyRoles("user"), deleteUser);
router.post("/forget-password", userForgotPassword);
router.put("/:id", verifyJWT, verifyRoles("user"), updateUser);
router.put("/change-role/:id", verifyJWT, verifyRoles("admin"), changeUserRole);

module.exports = router;
