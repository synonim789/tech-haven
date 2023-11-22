const User = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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
} = require("../controllers/userController");

router.get("/", getAllUser);
router.post("/", addUser);
router.get("/:id", getUser);
router.post("/login", loginUser);
router.post("/sign-up", signUpUser);
router.get("/get/count", getUserCount);
router.delete("/:id", deleteUser);
router.post("/forget-password", userForgotPassword);
router.put("/:id", updateUser);

module.exports = router;
