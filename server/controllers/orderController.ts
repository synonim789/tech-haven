import { Request, Response } from "express";
import mongoose from "mongoose";
import Order from "../models/order";

interface IParamsID {
  id?: string;
}

interface IUpdateOrderBody {
  status: string;
}

interface IAddOrder {
  order: {
    products: {
      quantity: number;
      price: number;
      name: string;
      productId: string;
    }[];
    shippingAddress1: string;
    shippingAddress2: string;
    phone: string;
    total: number;
    subtotal: number;
    userId: string;
  };
}

export const getAllOrders = async (req: Request, res: Response) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });
  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.status(200).json(orderList);
};

export const updateOrder = async (
  req: Request<IParamsID, unknown, IUpdateOrderBody, unknown>,
  res: Response,
) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid Order ID" });
  }
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true },
  );
  if (!order) {
    return res.status(404).json({ message: "The order cannot be updated!" });
  }
  res.status(200).json(order);
};

export const deleteOrder = async (
  req: Request<IParamsID, unknown, unknown, unknown>,
  res: Response,
) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid order ID" });
  }
  return res.status(200).json({ message: "test" });
};

export const addOrder = async (
  req: Request<unknown, unknown, IAddOrder, unknown>,
  res: Response,
) => {
  const products = req.body.order.products;
  const newOrder = new Order({
    orderItems: products,
    shippingAddress1: req.body.order.shippingAddress1,
    shippingAddress2: req.body.order.shippingAddress2,
    phone: req.body.order.phone,
    user: req.body.order.userId,
    subtotal: req.body.order.subtotal,
    total: req.body.order.total,
    status: "inProgress",
    createdAt: new Date(),
  });
  try {
    const savedOrder = await newOrder.save();
    console.log(`Processed Order: ${savedOrder}`);
    return res.status(200).json(newOrder);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Cannot Post Order" });
  }
};

export const getSingleOrder = async (
  req: Request<IParamsID, unknown, unknown, unknown>,
  res: Response,
) => {
  const id = req.params.id;
  const order = await Order.findOne({ _id: id }).populate(
    "orderItems.productId",
    "name image price",
  );
  if (!order) {
    return res.status(400).json({ message: "Order Not found" });
  }
  return res.status(200).json(order);
};
