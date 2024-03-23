import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "pending",
      "paid",
      "inProgress",
      "inDelivery",
      "delivered",
      "canceled",
    ],
  },
  total: Number,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
  subtotal: Number,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
