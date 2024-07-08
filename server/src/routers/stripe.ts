import * as express from "express";
import {
  createCheckoutSession,
  stripeWebhookHandler,
} from "../controllers/stripeController";
import { asyncWrapper } from "../utils/asyncWrapper";

const router = express.Router();

router.post("/create-checkout-session", asyncWrapper(createCheckoutSession));
router.post("/webhook", asyncWrapper(stripeWebhookHandler));

export default router;
