const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUser = asyncHandler(async (req, res) => {
  const userList = await User.find().select("-passwordHash");
  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.status(200).json(userList);
});

const addUser = asyncHandler(async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    role: req.body.role,
    street: req.body.street,
    apartment: req.body.apartment,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
  });
  user = await user.save();
  if (!user) {
    return res.status(404).json({ message: "The user cannot be created" });
  }
  res.status(200).json(user);
});

const getUser = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }
  const user = await User.findById(req.params.id).select("-passwordHash -role");
  if (!user) {
    return res
      .status(500)
      .json({ message: "The user with the given ID was not found" });
  }
  return res.status(200).json(user);
});

const loginUser = asyncHandler(async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields must be filled" });
  }

  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;

  if (!user) {
    return res.status(400).json({ message: "Incorrect email" });
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      secret,
      { expiresIn: "1d" },
    );
    res.status(200).json({ token: token });
  } else {
    res.status(400).json("Incorrect password");
  }
});

const signUpUser = asyncHandler(async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).json({ message: "All fields must be filled" });
  }

  const exist = await User.findOne({ email: req.body.email });
  if (exist) {
    return res.status(400).json({ message: "Email already in use" });
  }

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
  });

  user = await user.save();
  const secret = process.env.secret;
  const token = jwt.sign({ userId: user.id, role: user.role }, secret, {
    expiresIn: "1d",
  });
  if (!user) {
    return res.status(404).json({ message: "the user cannot be created!" });
  }
  res.status(200).json({ token: token });
});

const getUserCount = asyncHandler(async (req, res) => {
  const userCount = await User.countDocuments()
    .then((count) => count)
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
  if (!userCount) {
    return res.status(500).json({ success: false });
  }
  res.json({
    count: userCount,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "the user is deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "user not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

const userForgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "No User with that email find" });
  }

  const secret = process.env.secret;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: "1d",
  });
  return res.status(200).json({ success: true });
});

const updateUser = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.street = req.body.street || user.street;
    user.apartment = req.body.apartment || user.apartment;
    user.city = req.body.city || user.city;
    user.zip = req.body.zip || user.zip;
    user.country = req.body.country || user.country;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      street: updatedUser.street,
      apartment: updatedUser.apartment,
      city: updatedUser.city,
      zip: updatedUser.zip,
      country: updatedUser.country,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = {
  getAllUser,
  addUser,
  getUser,
  loginUser,
  signUpUser,
  getUserCount,
  deleteUser,
  userForgotPassword,
  updateUser,
};
