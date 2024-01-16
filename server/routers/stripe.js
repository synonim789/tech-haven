require("dotenv/config");
const express = require("express");
const Stripe = require("stripe");

const router = express.Router();

const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/create-checkout-session", async (req, res) => {
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

  console.log(line_items);

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/order-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.status(200).json({ url: session.url });
});

module.exports = router;
