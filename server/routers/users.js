const User = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const userList = await User.find().select("-passwordHash");
  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
  });

  user = await user.save();
  if (!user) {
    return res.status(404).send("the user cannot be created");
  }
  res.send(user);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid User ID");
  }
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) {
    res
      .status(500)
      .json({ message: "The user with the given ID was not found" });
  }
  res.status(200).send(user);
});

router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("All fields must be filled");
  }

  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;

  if (!user) {
    return res.status(400).send("Incorrect email");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
        name: user.name,
      },
      secret,
      { expiresIn: "1d" },
    );
    res.status(200).send({ user: user.email, token: token });
  } else {
    res.status(400).send("Incorrect password");
  }
});

router.post("/sign-up", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("All fields must be filled");
  }

  const exist = User.findOne({ email: req.body.email });
  if (exist) {
    return res.status(400).send("Email already in use");
  }

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
  });

  user = await user.save();
  const secret = process.env.secret;
  const token = jwt.sign({ user: user.id, isAdmin: user.isAdmin }, secret, {
    expiresIn: "1d",
  });
  if (!user) {
    return res.status(404).send("the user cannot be created!");
  }
  res.status(200).send({ user: user.email, token: token });
});

router.get("/get/count", async (req, res) => {
  const userCount = await User.countDocuments()
    .then((count) => count)
    .catch((err) => {
      return res.sendStatus(400).json({ success: false, error: err });
    });
  if (!userCount) {
    return res.status(500).json({ success: false });
  }
  res.send({
    count: userCount,
  });
});

router.delete("/:id", (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid User ID");
  }
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (userCount) {
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

module.exports = router;
