import * as bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Order from "../models/order";
import User from "../models/user";

export const getAllUser: RequestHandler = async (req, res) => {
  const userList = await User.find({ deleted: false }).select("-passwordHash");
  if (!userList) {
    res.status(500).json({ message: "Users not found" });
  }
  res.status(200).json(userList);
};

interface AddUserBody {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  street: string;
  apartment: string;
  city: string;
  zip: string;
  country: string;
}

export const addUser: RequestHandler<unknown, unknown, AddUserBody> = async (
  req,
  res,
) => {
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
};

interface GetUserParams {
  id?: string;
}

export const getUser: RequestHandler<
  GetUserParams,
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid User Id" });
  }
  const user = await User.findById(req.params.id).select("-passwordHash -role");
  if (!user) {
    return res
      .status(500)
      .json({ message: "The user with given ID was not found" });
  }
  return res.status(200).json(user);
};

interface LoginUserBody {
  email?: string | null;
  password?: string | null;
}

export const loginUser: RequestHandler<
  unknown,
  unknown,
  LoginUserBody,
  unknown
> = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields must be filled" });
  }
  const user = await User.findOne({ email: req.body.email });
  if (user?.deleted === true) {
    return res.status(400).json({
      message:
        "User was deleted, contact administration if you want to get it restored",
    });
  }
  const secret = process.env.secret as string;

  if (!user) {
    return res.status(400).json({ message: "Incorrect email or password" });
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      secret,
      { expiresIn: "7d" },
    );
    res.status(200).json({ token: token });
  } else {
    res.status(400).json({ message: "Incorrect password" });
  }
};

interface SignUpUserBody {
  email?: string | null;
  password?: string | null;
  name?: string | null;
}

export const signUpUser: RequestHandler<
  unknown,
  unknown,
  SignUpUserBody,
  unknown
> = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).json({ message: "All fields must be filled" });
  }
  const exist = await User.findOne({ email: req.body.email });
  if (exist?.deleted === true) {
    return res.status(500).json({
      message:
        "user has been deleted. Contact administration to have it restored",
    });
  }
  if (exist) {
    return res.status(400).json({ message: "Email already in use" });
  }
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
  });
  user = await user.save();
  const secret = process.env.secret as string;

  const token = jwt.sign({ userId: user.id, role: user.role }, secret, {
    expiresIn: "1d",
  });
  if (!user) {
    return res.status(404).json({ message: "the user cannot be created!" });
  }
  res.status(200).json({ token: token });
};

interface DeleteUserParams {
  id?: string;
}

export const deleteUser: RequestHandler<
  DeleteUserParams,
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.params.id }, { deleted: true });
    return res.status(200).json({ message: "User deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "cannot delete user" });
  }
};

interface UserForgotPasswordBody {
  email?: string;
}

export const userForgotPassword: RequestHandler<
  unknown,
  unknown,
  UserForgotPasswordBody,
  unknown
> = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user?.deleted === true) {
    return res.status(500).json({
      message:
        "User with this email was deleted. contact with administration to have it restored.",
    });
  }
  if (!user) {
    return res.status(404).json({ message: "No User with that email find" });
  }

  return res.status(200).json({ success: true });
};

interface UpdateUserParams {
  id?: string;
}

interface UpdateUserBody {
  name: string;
  phone: string;
  street: string;
  apartment: string;
  city: string;
  zip: string;
  country: string;
}

export const updateUser: RequestHandler<
  UpdateUserParams,
  unknown,
  UpdateUserBody,
  unknown
> = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }
  const user = await User.findById(req.params.id);
  if (user?.deleted === true) {
    return res.status(500).json({
      message:
        "User is deleted. Contact with administration if you want it changed",
    });
  }

  if (user) {
    user.name = req.body.name || user.name;
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
};

interface ChangeUserRoleParams {
  id?: string;
}

export const changeUserRole: RequestHandler<
  ChangeUserRoleParams,
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }
  const user = await User.findById(req.params.id);
  if (user?.deleted === true) {
    return res.status(500).json({
      message:
        "User is deleted. Contact with administration if you want it changed",
    });
  }
  if (user) {
    if (user.role === "admin" && user.name !== "admin") {
      user.role = "user";
    } else if (user.role === "user") {
      user.role = "admin";
    } else {
      return res
        .status(401)
        .json({ message: "Basic Admin Role cannot be changed" });
    }

    await user.save();
    return res.status(200).json({ message: "User changed" });
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
};

interface GetUserOrderParams {
  id?: string;
}

interface GetUserOrderQuery {
  page?: string;
}

export const getUserOrder: RequestHandler<
  GetUserOrderParams,
  unknown,
  unknown,
  GetUserOrderQuery
> = async (req, res) => {
  const user = await User.findById(req.params.id);
  const page = parseInt(req.query.page || "0");
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const userOrders = await Order.find({ user: req.params.id })
    .limit(5)
    .skip(5 * page)
    .sort({ dateOrdered: -1 });
  const orderCount = await Order.countDocuments({ user: req.params.id });
  return res.status(200).json({ total: Math.ceil(orderCount / 5), userOrders });
};
