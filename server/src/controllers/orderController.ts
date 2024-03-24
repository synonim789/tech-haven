import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import Order from "../models/order";

interface IParamsID {
  id?: string;
}

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

interface UpdateOrderParams {
  id?: string;
}

interface UpdateOrderBody {
  status:
    | "pending"
    | "paid"
    | "inProgress"
    | "inDelivery"
    | "delivered"
    | "canceled";
}

export const updateOrder: RequestHandler<
  UpdateOrderParams,
  unknown,
  UpdateOrderBody
> = async (req, res, next) => {
  const status = req.body.status;
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

export const addOrder: RequestHandler<
  unknown,
  unknown,
  AddOrderBody,
  unknown
> = async (req, res, next) => {
  const order = req.body.order;

  try {
    if (!order) {
      throw createHttpError(400, "Order data is missing");
    }

    const { products, shippingAddress1, phone, userId, subtotal, total } =
      order;
    if (
      !products ||
      !shippingAddress1 ||
      !phone ||
      !userId ||
      !subtotal ||
      !total
    ) {
      throw createHttpError(400, "Incomplete order data");
    }

    const newOrder = new Order({
      orderItems: products,
      shippingAddress1: shippingAddress1,
      shippingAddress2: shippingAddress1,
      phone: phone,
      user: userId,
      subtotal: subtotal,
      total: total,
      status: "inProgress",
      createdAt: new Date(),
    });

    const savedOrder = await newOrder.save();
    return res.status(200).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

interface GetSingleOrderParams {
  id?: string;
}

export const getSingleOrder: RequestHandler<
  GetSingleOrderParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
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
