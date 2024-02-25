import * as express from "express";
import {
  createCheckoutSession,
  stripeWebhookHandler,
} from "../controllers/stripeController";

const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);

router.post("/webhook", stripeWebhookHandler);

export default router;
