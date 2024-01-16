require("dotenv/config");
const express = require("express");
const Stripe = require("stripe");
const Order = require("../models/order");

const router = express.Router();

const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      user: req.body.userId,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      phone: req.body.phone,
      products: JSON.stringify(req.body.products),
    },
  });

  const line_items = req.body.products.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
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

  res.status(200).json({ url: session.url });
});

// create Order
const createOrder = async (customer, data) => {
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

let endpointSecret;

// endpointSecret =
//   "whsec_7a88eecacf411902c908bcf5e8a4c242d347af71cb70bc28bc77b2861d739e61";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let data;
    let eventType;

    if (endpointSecret) {
      let event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("Webhook verified");
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          createOrder(customer, data);
        })
        .catch((err) => console.log(err));
    }
    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
  },
);

module.exports = router;
