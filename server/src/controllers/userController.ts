import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Order from "../models/order";
import User from "../models/user";
import env from "../utils/validateEnv";

export const getAllUser: RequestHandler = async (req, res, next) => {
  try {
    const userList = await User.find({ deleted: false }).select(
      "-passwordHash",
    );
    if (!userList) {
      throw createHttpError(404, "Users not found");
    }
    res.status(200).json(userList);
  } catch (error) {
    next(error);
  }
};

interface AddUserBody {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: string;
  street?: string;
  apartment?: string;
  city?: string;
  zip?: string;
  country?: string;
}

export const addUser: RequestHandler<unknown, unknown, AddUserBody> = async (
  req,
  res,
  next,
) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      throw createHttpError(400, "Parameters missing");
    }

    const existingEmail = await User.findOne({ email: req.body.email }).exec();

    if (existingEmail) {
      throw createHttpError(
        409,
        "A user with this email address already exists.",
      );
    }

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

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface GetUserParams {
  id?: string;
}

export const getUser: RequestHandler<
  GetUserParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw createHttpError(400, "Invalid User Id");
    }
    const user = await User.findById(req.params.id).select(
      "-passwordHash -role",
    );
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    if (req.userId !== user._id.toString() && req.role !== "admin") {
      throw createHttpError(401, "You cannot access this user");
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
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
> = async (req, res, next) => {
  const email = req.body.email;
  const passwordRaw = req.body.password;
  try {
    if (!email || !passwordRaw) {
      throw createHttpError(400, "Email or password missing");
    }

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
  } catch (error) {
    next(error);
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
> = async (req, res, next) => {
  const email = req.body.email;
  const passwordRaw = req.body.password;
  const name = req.body.name;
  try {
    if (!email || !passwordRaw || !name) {
      throw createHttpError(400, "Missing parameters");
    }
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
      name: req.body.name,
      email: req.body.email,
      passwordHash: passwordHash,
    });
    user = await user.save();
    const secret = env.SECRET;

    const token = jwt.sign({ userId: user.id, role: user.role }, secret, {
      expiresIn: "1d",
    });

    res.status(200).json({ token: token });
  } catch (error) {
    next(error);
  }
};

interface DeleteUserParams {
  id?: string;
}

export const deleteUser: RequestHandler<
  DeleteUserParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const userId = req.params.id;
  try {
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
  } catch (error) {
    next(error);
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
> = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

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
  } catch (error) {
    next(error);
  }
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
> = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }
    const user = await User.findById(req.params.id).exec();

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
  } catch (error) {
    next(error);
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
> = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw createHttpError(400, "Invalid User Id");
    }

    const user = await User.findById(req.params.id).exec();

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
  } catch (error) {
    next(error);
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
> = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw createHttpError(400, "Invalid user id");
    }

    const user = await User.findById(req.params.id).exec();

    if (!user) {
      throw createHttpError(404, "User not found");
    }
    const page = parseInt(req.query.page || "0");

    const userOrders = await Order.find({ user: req.params.id })
      .limit(5)
      .skip(5 * page)
      .sort({ dateOrdered: -1 });
    const orderCount = await Order.countDocuments({ user: req.params.id });
    return res
      .status(200)
      .json({ total: Math.ceil(orderCount / 5), userOrders });
  } catch (error) {
    next(error);
  }
};
