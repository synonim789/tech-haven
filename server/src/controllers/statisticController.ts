import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Order from "../models/order";
import Product from "../models/product";
import User from "../models/user";

export const getOrderCount: RequestHandler = async (_req, res) => {
  const orderCount = await Order.countDocuments()
    .then((count) => count)
    .catch((err) => {
      throw createHttpError(500, err.toString());
    });

  if (!orderCount) {
    throw createHttpError(404, "Orders not found");
  }

  res.status(200).json({
    count: orderCount,
  });
};

export const getTotalSales: RequestHandler = async (_req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: "$total" } } },
  ]);

  if (!totalSales) {
    throw createHttpError(500, "Total sales cannot be generated");
  }
  res.status(200).json({ totalSales: totalSales.pop().totalSales });
};

export const getProductsCount: RequestHandler = async (_req, res) => {
  const productCount = await Product.countDocuments({ deleted: false })
    .then((count) => count)
    .catch((err) => {
      throw createHttpError(500, err.toString());
    });

  if (!productCount) {
    throw createHttpError(404, "Product count not found");
  }

  res.status(200).json({
    count: productCount,
  });
};

export const getUserCount: RequestHandler = async (_req, res) => {
  const userCount = await User.countDocuments({ deleted: false })
    .then((count) => count)
    .catch((err) => {
      throw createHttpError(500, err.toString());
    });

  if (!userCount) {
    throw createHttpError(404, "Users not found");
  }
  res.status(200).json({
    count: userCount,
  });
};

export const getSalesByDate: RequestHandler = async (_req, res) => {
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

  if (!salesByDate) {
    throw createHttpError(500, "Sales by Date couldn't be generated");
  }

  return res.status(200).json(salesByDate);
};

export const getSalesByCategory: RequestHandler = async (_req, res) => {
  const ordersByCategory = await Order.aggregate([
    {
      $match: {
        status: { $not: { $eq: "canceled" } },
      },
    },
    {
      $unwind: "$orderItems",
    },
    {
      $lookup: {
        from: "products",
        localField: "orderItems.productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $lookup: {
        from: "categories",
        localField: "product.category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $group: {
        _id: "$category._id",
        categoryName: { $first: "$category.name" },
        totalSales: { $sum: "$orderItems.price" },
      },
    },
  ]);
  if (!ordersByCategory) {
    throw createHttpError(500, "orders By Category couldn't be generated");
  }
  res.status(200).json(ordersByCategory);
};
