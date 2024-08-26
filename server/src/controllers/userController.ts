import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Order from "../models/order";
import User from "../models/user";
import {
  AddUserSchema,
  ForgotPasswordSchema,
  LoginSchema,
  SignUpSchema,
  UpdateUserSchema,
} from "../schemas/userSchema";
import env from "../utils/validateEnv";

export const getAllUser: RequestHandler = async (_req, res) => {
  const userList = await User.find({ deleted: false }).select("-passwordHash");
  if (!userList) {
    throw createHttpError(404, "Users not found");
  }
  res.status(200).json(userList);
};

export const addUser: RequestHandler = async (req, res) => {
  const {
    name,
    email,
    phone,
    role,
    street,
    apartment,
    city,
    zip,
    country,
    password: passwordRaw,
  } = AddUserSchema.parse(req.body);

  const existingEmail = await User.findOne({ email: email }).exec();

  if (existingEmail) {
    throw createHttpError(
      409,
      "A user with this email address already exists.",
    );
  }

  let user = new User({
    name: name,
    email: email,
    passwordHash: bcrypt.hashSync(passwordRaw, 10),
    phone: phone,
    role: role,
    street: street,
    apartment: apartment,
    city: city,
    zip: zip,
    country: country,
  });
  user = await user.save();

  res.status(200).json(user);
};

export const getUser: RequestHandler = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.isValidObjectId(userId)) {
    throw createHttpError(400, "Invalid User Id");
  }
  const user = await User.findById(userId).select("-passwordHash -role");
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  if (req.userId !== user._id.toString() && req.role !== "admin") {
    throw createHttpError(401, "You cannot access this user");
  }

  return res.status(200).json(user);
};

export const loginUser: RequestHandler = async (req, res) => {
  const { email, password: passwordRaw } = LoginSchema.parse(req.body);

  const user = await User.findOne({ email: email });
  if (!user) {
    throw createHttpError(400, "Incorrect email or password");
  }
  if (user?.deleted === true) {
    throw createHttpError(
      400,
      "User was deleted, contact administration if you want to get it restored",
    );
  }
  const secret = env.SECRET;

  const passwordMatch = await bcrypt.compare(passwordRaw, user.passwordHash);

  if (!passwordMatch) {
    throw createHttpError(401, "Incorrect email or password");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    secret,
    { expiresIn: "7d" },
  );
  res.status(200).json({ token: token });
};

export const signUpUser: RequestHandler = async (req, res) => {
  const { email, password: passwordRaw, name } = SignUpSchema.parse(req.body);
  const exist = await User.findOne({ email: email });
  if (exist?.deleted === true) {
    throw createHttpError(
      409,
      "user has been deleted. Contact administration to have it restored",
    );
  }
  if (exist) {
    throw createHttpError(409, "User with this email already exists.");
  }

  const passwordHash = await bcrypt.hash(passwordRaw, 10);

  let user = new User({
    name: name,
    email: email,
    passwordHash: passwordHash,
  });
  user = await user.save();
  const secret = env.SECRET;

  const token = jwt.sign({ userId: user.id, role: user.role }, secret, {
    expiresIn: "1d",
  });

  res.status(200).json({ token: token });
};

export const deleteUser: RequestHandler = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.isValidObjectId(userId)) {
    throw createHttpError(400, "Invalid User Id");
  }

  const user = await User.findById(userId).exec();
  if (!user) {
    throw createHttpError(404, "User not found");
  }
  if (req.userId !== user._id.toString() && req.role !== "admin") {
    throw createHttpError(401, "You cannot access this user");
  }
  await user.updateOne({ deleted: true });
  res.sendStatus(204);
};

export const userForgotPassword: RequestHandler = async (req, res) => {
  const { email } = ForgotPasswordSchema.parse(req.body);
  const user = await User.findOne({ email: email });

  if (!user) {
    return createHttpError(404, "No User with that email find");
  }

  if (user.deleted === true) {
    return createHttpError(
      404,
      "User with this email was deleted. contact with administration to have it restored.",
    );
  }

  return res.status(200).json({ success: true });
};

export const updateUser: RequestHandler = async (req, res) => {
  const userId = req.params.id;

  const { name, phone, street, apartment, city, zip, country } =
    UpdateUserSchema.parse(req.body);
  if (!mongoose.isValidObjectId(userId)) {
    throw createHttpError(400, "User Id not valid");
  }
  const user = await User.findById(userId).exec();

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  if (user.deleted === true) {
    throw createHttpError(
      404,
      "User is deleted. Contact with administration if you want it changed",
    );
  }

  if (req.userId !== user._id.toString() && req.role !== "admin") {
    throw createHttpError(401, "You cannot access this user");
  }

  user.name = name || user.name;
  user.phone = phone || user.phone;
  user.street = street || user.street;
  user.apartment = apartment || user.apartment;
  user.city = city || user.city;
  user.zip = zip || user.zip;
  user.country = country || user.country;

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
};

export const changeUserRole: RequestHandler = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.isValidObjectId(userId)) {
    throw createHttpError(400, "Invalid User Id");
  }

  const user = await User.findById(userId).exec();

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  if (user.deleted === true) {
    createHttpError(
      404,
      "User is deleted. Contact with administration if you want it changed",
    );
  }

  if (user.role === "admin" && user.name !== "admin") {
    user.role = "user";
  } else if (user.role === "user") {
    user.role = "admin";
  } else {
    throw createHttpError(403, "Basic Admin Role cannot be changed");
  }

  await user.save();
  return res.status(200).json({ message: "User changed" });
};

export const getUserOrder: RequestHandler = async (req, res) => {
  const userId = req.params.id;
  const pageQuery = req.query.page as string;

  if (!mongoose.isValidObjectId(userId)) {
    throw createHttpError(400, "Invalid user id");
  }

  const user = await User.findById(userId).exec();

  if (!user) {
    throw createHttpError(404, "User not found");
  }
  const page = parseInt(pageQuery || "0");

  const userOrders = await Order.find({ user: userId })
    .limit(5)
    .skip(5 * page)
    .sort({ dateOrdered: -1 });
  const orderCount = await Order.countDocuments({ user: userId });
  return res.status(200).json({ total: Math.ceil(orderCount / 5), userOrders });
};
