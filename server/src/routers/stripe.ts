import express from "express";
import {
  createCheckoutSession,
  stripeWebhookHandler,
} from "../controllers/stripeController.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const router = express.Router();

router.post("/create-checkout-session", asyncWrapper(createCheckoutSession));
router.post("/webhook", asyncWrapper(stripeWebhookHandler));

export default router;
