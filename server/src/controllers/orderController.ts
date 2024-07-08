import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import Order from "../models/order";
import { AddOrderSchema, updateOrderSchema } from "../schemas/orderSchema";

export const getAllOrders: RequestHandler = async (req, res, next) => {
  try {
    const orderList = await Order.find()
      .populate("user", "name")
      .sort({ dateOrdered: -1 });
    if (!orderList) {
      throw createHttpError(404, "Orders not found");
    }
    res.status(200).json(orderList);
  } catch (error) {
    next(error);
  }
};

export const updateOrder: RequestHandler = async (req, res, next) => {
  const { status } = updateOrderSchema.parse(req.body);
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw createHttpError(400, "Order Id is not valid");
    }

    const order = await Order.findById(req.params.id).exec();

    if (!order) {
      throw createHttpError(404, "Order not found");
    }

    order.status = status;
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

interface AddOrderBody {
  order?: {
    products?: {
      quantity?: number;
      price?: number;
      name?: string;
      productId?: string;
    }[];
    shippingAddress1?: string;
    shippingAddress2?: string;
    phone?: string;
    total?: number;
    subtotal?: number;
    userId?: string;
  };
}

export const addOrder: RequestHandler = async (req, res, next) => {
  const { order } = AddOrderSchema.parse(req.body);

  try {
    if (!order) {
      throw createHttpError(400, "Order data is missing");
    }



    const newOrder = new Order({
      orderItems: order.products,
      shippingAddress1: order.shippingAddress1,
      shippingAddress2: order.shippingAddress1,
      phone: order.phone,
      user: order.userId,
      subtotal: order.subtotal,
      total: order.total,
      status: "inProgress",
      createdAt: new Date(),
    });

    const savedOrder = await newOrder.save();
    return res.status(200).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

export const getSingleOrder: RequestHandler = async (req, res, next) => {
  const orderId = req.params.id;
  try {
    if (!mongoose.isValidObjectId(orderId)) {
      throw createHttpError(400, "Order id is invalid");
    }

    const order = await Order.findById(orderId).populate(
      "orderItems.productId",
      "name image price",
    );
    if (!order) {
      createHttpError(404, "Order not found ");
    }

    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
