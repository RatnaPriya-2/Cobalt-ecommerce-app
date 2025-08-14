import express from "express";

import bodyParser from "body-parser";
import StripeWebhookController from "../controllers/stripeWebhookController.js";

const webHookRouter = express.Router();

webHookRouter.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  StripeWebhookController
);

export default webHookRouter;
