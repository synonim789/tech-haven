import { Request, Response } from "express";
import Stripe from "stripe";
import Order from "../models/order";

const STRIPE = new Stripe(process.env.STRIPE_KEY as string);
const STRIPE_ENDPOINT_SECRET = process.env.ENDPOINT_SECRET as string;
const CLIENT_URL = process.env.CLIENT_URL as string;

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

export const stripeWebhookHandler = async (req: Request, res: Response) => {
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    const body = req.body;
    if (!sig) {
      throw new Error("no signature");
    }
    console.log(sig);
    event = STRIPE.webhooks.constructEvent(body, sig, STRIPE_ENDPOINT_SECRET);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const order = await Order.findById(event.data.object.metadata?.orderId);
    console.log(order);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.subtotal = event.data.object.amount_subtotal;
    order.total = event.data.object.amount_total;
    order.status = "paid";
    await order.save();
  }
  return res.status(200).end();
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body.order;
    const newOrder = new Order({
      shippingAddress1: checkoutSessionRequest.shippingAddress1,
      shippingAddress2: checkoutSessionRequest.shippingAddress2,
      phone: checkoutSessionRequest.phone,
      user: checkoutSessionRequest.userId,
      orderItems: checkoutSessionRequest.products,
      status: "pending",
      dateOrdered: new Date()
    });

    const lineItems = createLineItems(checkoutSessionRequest);
    const session = await createSession(lineItems, newOrder._id.toString());

    if (!session.url) {
      return res.status(500).json({ message: "Error creating stripe session" });
    }

    await newOrder.save();

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
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
