import express from "express";

import bodyParser from "body-parser";
import webHookController from "../controllers/webhookController.js";

const webHookRouter = express.Router();

webHookRouter.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  webHookController
);

export default webHookRouter;
