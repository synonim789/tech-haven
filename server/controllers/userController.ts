import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Order from "../models/order";
import User from "../models/user";

interface IAddUserBody {
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

interface IParamsID {
  id?: number;
}

interface ILoginUserBody {
  email?: string | null;
  password?: string | null;
}

interface ISignUpUser {
  email?: string | null;
  password?: string | null;
  name?: string | null;
}

interface IUpdateUser {
  name: string;
  phone: string;
  street: string;
  apartment: string;
  city: string;
  zip: string;
  country: string;
}

interface IGetUserOrderQuery {
  page?: string;
}

export const getAllUser = async (req: Request, res: Response) => {
  const userList = await User.find({ deleted: false }).select("-passwordHash");
  if (!userList) {
    res.status(500).json({ message: "Users not found" });
  }
  res.status(200).json(userList);
};

export const addUser = async (
  req: Request<unknown, unknown, IAddUserBody, unknown>,
  res: Response,
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

export const getUser = async (
  req: Request<IParamsID, unknown, unknown, unknown>,
  res: Response,
) => {
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

export const loginUser = async (
  req: Request<unknown, unknown, ILoginUserBody, unknown>,
  res: Response,
) => {
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

export const signUpUser = async (
  req: Request<unknown, unknown, ISignUpUser>,
  res: Response,
) => {
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

export const getUserCount = async (req: Request, res: Response) => {
  const userCount = await User.countDocuments({ deleted: false })
    .then((count) => count)
    .catch((err) => {
      return res
        .status(400)
        .json({ message: "Something went wrong", err: err });
    });
  if (!userCount) {
    return res.status(500).json({ message: "users not found" });
  }
  res.json({
    count: userCount,
  });
};

export const deleteUser = async (
  req: Request<IParamsID, unknown, unknown, unknown>,
  res: Response,
) => {
  try {
    await User.findOneAndUpdate({ _id: req.params.id }, { deleted: true });
    return res.status(200).json({ message: "User deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "cannot delete user" });
  }
};

export const userForgotPassword = async (
  req: Request<unknown, unknown, { email: string }, unknown>,
  res: Response,
) => {
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

export const updateUser = async (
  req: Request<IParamsID, unknown, IUpdateUser, unknown>,
  res: Response,
) => {
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

export const changeUserRole = async (
  req: Request<IParamsID, unknown, unknown, unknown>,
  res: Response,
) => {
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

export const getUserOrder = async (
  req: Request<IParamsID, unknown, unknown, IGetUserOrderQuery>,
  res: Response,
) => {
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
