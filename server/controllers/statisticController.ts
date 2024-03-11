import { Request, Response } from "express";
import Order from "../models/order";
import Product from "../models/product";
import User from "../models/user";

export const getOrderCount = async (req: Request, res: Response) => {
  const orderCount = await Order.countDocuments()
    .then((count) => count)
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
  if (!orderCount) {
    return res.status(500).json({ success: false });
  }
  res.status(200).json({
    count: orderCount,
  });
};

export const getTotalSales = async (req: Request, res: Response) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: "$total" } } },
  ]);

  if (!totalSales) {
    return res
      .status(400)
      .json({ message: "The order sales cannot be generated" });
  }
  res.status(200).json({ totalSales: totalSales.pop().totalSales });
};

export const getProductsCount = async (req: Request, res: Response) => {
  const productCount = await Product.countDocuments({ deleted: false })
    .then((count) => count)
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
  if (!productCount) {
    return res.status(500).json({ success: false });
  }
  res.status(200).json({
    count: productCount,
  });
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

export const getSalesByDate = async (req: Request, res: Response) => {
  const salesByDate = await Order.aggregate([
    {
      $match: {
        status: { $not: { $eq: "canceled" } },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$dateOrdered",
          },
        },
        total: {
          $sum: "$total",
        },
      },
    },
    {
      $sort: { _id: -1 },
    },
  ]);
  res.send(salesByDate);
};

export const getSalesByCategory = async (req: Request, res: Response) => {
  const ordersByCategory = await Order.aggregate([
    {
      $match: {
        status: { $not: { $eq: "canceled" } },
      },
    },
  ]);

  res.json(ordersByCategory);
};
