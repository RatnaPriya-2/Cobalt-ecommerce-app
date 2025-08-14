import express from "express";
import { allOrders, updateStatus } from "../controllers/orderController.js";

import adminAuth from "../middlewares/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/updateStatus", adminAuth, updateStatus);
orderRouter.get("/allOrders", adminAuth, allOrders);


export default orderRouter;
