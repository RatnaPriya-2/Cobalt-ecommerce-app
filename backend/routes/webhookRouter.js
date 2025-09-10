import express from "express";

import StripeWebhookController from "../controllers/stripeWebhookController.js";

const webHookRouter = express.Router();

webHookRouter.post(
  "/",
  express.raw({ type: "application/json" }),
  StripeWebhookController
);

export default webHookRouter;
