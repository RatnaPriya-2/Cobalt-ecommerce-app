import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import { get } from "mongoose";

const addToCart = async (req, res) => {
  let { item, size } = req.body;

  let user = req.user;
  try {
    let getUser = await userModel.findById({ _id: user._id });

    if (!getUser) {
      return res.json({
        success: false,
        message: "Not authorised, please login to continue",
      });
    }

    let alreadyAddedProduct = getUser.cartProducts.find(
      (product) =>
        product._id.toString() === item._id.toString() &&
        product.requiredSize === size
    );

    if (alreadyAddedProduct) {
      alreadyAddedProduct.quantity += 1;
      getUser.markModified("cartProducts");
      await getUser.save();

      return res.json({
        success: true,
        message: "Product already in cart, quantity increased by one",
      });
    } else {
      let product = await productModel.findOne({ _id: item._id }).lean();
      getUser.cartProducts.push({
        ...product,
        requiredSize: size,
        quantity: 1,
      });
      await getUser.save();
      return res.json({ success: true, message: "Product added to cart" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
const updateQuantity = async (req, res) => {
  let { item, quantity, requiredSize } = req.body;

  let user = req.user;

  try {
    let getUser = await userModel.findOne({ _id: user._id });
    if (!getUser) {
      return res.json({
        success: false,
        message: "Not authorised, please login to continue",
      });
    }

    let getProduct = getUser.cartProducts.find(
      (product) =>
        product._id.toString() === item._id.toString() &&
        product.requiredSize === requiredSize
    );

    if (getProduct) {
      getProduct.quantity = quantity;
      getUser.markModified("cartProducts");
      await getUser.save();
      return res.json({
        success: true,
        message: "Product quantity updated",
      });
    } else {
      return res.json({ success: false, message: "product not found " });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const deleteFromCart = async (req, res) => {
  let { item, requiredSize } = req.body;
  let user = req.user;

  try {
    let getUser = await userModel.findOne({ _id: user._id });
    if (!getUser) {
      return res.json({
        success: false,
        message: "Not authorised, please login to continue",
      });
    }

    let getProduct = getUser.cartProducts.find(
      (product) =>
        product._id.toString() === item._id.toString() &&
        product.requiredSize === requiredSize
    );
    if (getProduct) {
      await userModel.updateOne(
        {
          _id: getUser._id,
        },
        {
          $pull: {
            cartProducts: {
              _id: getProduct._id,
              requiredSize: getProduct.requiredSize,
            },
          },
        }
      );

      return res.json({
        success: true,
        message: "Product successfully deleted from cart",
      });
    } else {
      return res.json({ success: false, message: "product not found " });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
const getCartData = async (req, res) => {
  let user = req.user;
  try {
    let getUser = await userModel.findOne({ _id: user._id });
    if (!getUser) {
      return res.json({ success: false, message: "user details not found " });
    }

    return res.json({ success: true, cartData: getUser.cartProducts });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateQuantity, deleteFromCart, getCartData };
