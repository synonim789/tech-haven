import "dotenv/config";
import * as express from "express";
import Stripe from "stripe";
import Order from "../models/order";

const router = express.Router();
const endpointSecret =
  "whsec_7a88eecacf411902c908bcf5e8a4c242d347af71cb70bc28bc77b2861d739e61";

if (!process.env.STRIPE_KEY) {
  throw new Error("Environmental variable STRIPE_KEY not found");
}

const stripe = new Stripe(process.env.STRIPE_KEY);

router.post("/create-checkout-session", express.json(), async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      user: req.body.userId,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      phone: req.body.phone,
      products: JSON.stringify(req.body.products),
    },
  });

  const line_items = req.body.products.map((item: any) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/order-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  return res.status(200).json({ url: session.url });
});

const createOrder = async (customer: any, data: any) => {
  const Items = JSON.parse(customer.metadata.products);
  const newOrder = new Order({
    orderItems: Items,
    shippingAddress1: customer.metadata.shippingAddress1,
    shippingAddress2: customer.metadata.shippingAddress2,
    phone: customer.metadata.phone,
    user: customer.metadata.user,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log(`Processed Order: ${savedOrder}`);
  } catch (err) {
    console.log(err);
  }
};

// const createOrder = (
//   session: Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>,
// ) => {
//   console.log(session);
// };

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    console.log(sig);
    if (!sig) {
      throw new Error("No signature");
    }
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
      console.log(err);
      return res.status(400).json({ message: `Webkook Error ${err.message}` });
    }
    console.log("xdd");

    if (event.type === "checkout.session.completed") {
      stripe.customers
        .retrieve(event.data.object.customer as string)
        .then((customer) => {
          createOrder(customer, event.data.object);
        });
    }

    return res.status(200).end();
  },
);

export default router;
