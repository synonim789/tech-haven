import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Stripe from "stripe";
import Order from "../models/order";
import env from "../utils/validateEnv";

const STRIPE = new Stripe(env.STRIPE_KEY);
const STRIPE_ENDPOINT_SECRET = env.STRIPE_ENDPOINT_SECRET;
const CLIENT_URL = env.CLIENT_URL;

type CheckoutSessionRequest = {
  shippingAddress1: string;
  shippingAddress2: string;
  userId: string;
  phone: string;
  products: {
    quantity: string;
    productId: number;
    name: string;
    price: number;
  }[];
};

export const stripeWebhookHandler: RequestHandler = async (req, res, next) => {
  try {
    const sig = req.headers["stripe-signature"];
    const body = req.body;
    if (!sig) {
      throw createHttpError(404, "Sig not found");
    }
    let event;
    try {
      event = STRIPE.webhooks.constructEvent(body, sig, STRIPE_ENDPOINT_SECRET);
    } catch (error) {
      console.error("Error constructing Stripe event:", error);
      throw createHttpError(400, "Invalid Stripe webhook event");
    }
    if (event.type === "checkout.session.completed") {
      const order = await Order.findById(event.data.object.metadata?.orderId);
      console.log(order);
      if (!order) {
        throw createHttpError(404, "Order not found");
      }
      order.subtotal = event.data.object.amount_subtotal;
      order.total = event.data.object.amount_total;
      order.status = "paid";
      await order.save();
    }
    return res.status(200).end();
  } catch (error) {
    next(error);
  }
};

export const createCheckoutSession: RequestHandler = async (req, res, next) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body.order;
    const newOrder = new Order({
      shippingAddress1: checkoutSessionRequest.shippingAddress1,
      shippingAddress2: checkoutSessionRequest.shippingAddress2,
      phone: checkoutSessionRequest.phone,
      user: checkoutSessionRequest.userId,
      orderItems: checkoutSessionRequest.products,
      status: "pending",
      dateOrdered: new Date(),
    });

    const lineItems = createLineItems(checkoutSessionRequest);
    const session = await createSession(lineItems, newOrder._id.toString());

    if (!session.url) {
      throw createHttpError(500, "Error creating stripe session");
    }

    await newOrder.save();

    return res.status(200).json({ url: session.url });
  } catch (error) {
    next(error);
  }
};

const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest) => {
  const lineItems = checkoutSessionRequest.products.map((item) => {
    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "usd",
        unit_amount: item.price,
        product_data: {
          name: item.name,
        },
      },
      quantity: parseInt(item.quantity),
    };
    return line_item;
  });
  return lineItems;
};

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
    },
    success_url: `${CLIENT_URL}/order-success`,
    cancel_url: `${CLIENT_URL}/cart`,
  });

  return sessionData;
};
