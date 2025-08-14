import express from "express";
import {
  addToCart,
  getCartData,
  deleteFromCart,
  updateQuantity,
} from "../controllers/cartController.js";
import userAuth from "../middlewares/userAuth.js";

const cartRouter = express.Router();

cartRouter.post("/add", userAuth, addToCart);
cartRouter.post("/update", userAuth, updateQuantity);
cartRouter.post("/delete", userAuth, deleteFromCart);
cartRouter.get("/getCartData", userAuth, getCartData);

export default cartRouter;
