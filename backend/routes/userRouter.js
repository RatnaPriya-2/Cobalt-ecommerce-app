import express from "express";
import {
  adminLogin,
  adminLogout,
  login,
  logout,
  register,
  verifyOrder,
} from "../controllers/userController.js";

import {
  placeOrderCod,
  placeOrderRazorpay,
  placeOrderStripe,
  userOrders,
  verifyRazorpayPayment,
} from "../controllers/orderController.js";
import userAuth from "../middlewares/userAuth.js";
import { listAllProducts } from "../controllers/productController.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/placeOrderCod", userAuth, placeOrderCod);
userRouter.post("/placeOrderStripe", userAuth, placeOrderStripe);
userRouter.post("/placeOrderRazorpay", userAuth, placeOrderRazorpay);
userRouter.get("/listAllProducts", listAllProducts);
userRouter.post("/verifyOrder", userAuth, verifyOrder);
userRouter.post("/verifyRazorpayPayment", userAuth, verifyRazorpayPayment);

userRouter.get("/orders", userAuth, userOrders);
userRouter.post("/adminLogin", adminLogin);
userRouter.post("/adminLogout", adminLogout);

export default userRouter;
