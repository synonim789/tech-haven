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
  const user = await User.findById(req.params.id).select(
    "-passwordHash -isAdmin",
  );
  if (!user) {
    return res
      .status(500)
      .json({ message: "The user with the given ID was not found" });
  }
  return res.status(200).send(user);
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
      },
      secret,
      { expiresIn: "1d" },
    );
    res.status(200).send({ token: token });
  } else {
    res.status(400).send("Incorrect password");
  }
});

router.post("/sign-up", async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).send("All fields must be filled");
  }

  const exist = await User.findOne({ email: req.body.email });
  if (exist) {
    return res.status(400).send("Email already in use");
  }

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
  });

  user = await user.save();
  const secret = process.env.secret;
  const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, secret, {
    expiresIn: "1d",
  });
  if (!user) {
    return res.status(404).send("the user cannot be created!");
  }
  res.status(200).send({ token: token });
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

router.post("/forget-password", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send("No User with that email find");
  }

  const secret = process.env.secret;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: "1d",
  });
  const link = `http://localhost:3000/reset-password/${user.id}/${token}`;
  console.log(link);
  return res.status(200).send({ success: true });
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid User ID");
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

module.exports = router;
