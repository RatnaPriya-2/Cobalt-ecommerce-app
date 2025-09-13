//for user

import orderModel from "../models/orderModel.js";
import temporaryOrderModel from "../models/temporaryOrderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";
import crypto from "crypto";

const currency = "inr";
const deliveryFee = 10;

//initialse stripe

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrderCod = async (req, res) => {
  let { address, paymentMethod, items, totalPrice, userName } =
    req.body.finalData;
  let user = req.user;

  try {
    await orderModel.create({
      userId: user._id,
      userName: userName,
      items: items,
      amount: totalPrice,
      address: address,
      paymentMethod: paymentMethod,
      date: Date.now(),
    });

    await userModel.findOneAndUpdate({ _id: user._id }, { cartProducts: [] });

    return res.json({ success: true, message: "order placed Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
const placeOrderStripe = async (req, res) => {
  let finalData = req.body.finalData;
  let { address, paymentMethod, items, totalPrice, userName } = finalData;
  let user = req.user;
  let { origin } = req.headers;

  let line_items = items.map((item) => ({
    price_data: {
      currency: currency,
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  line_items.push({
    price_data: {
      currency: currency,
      product_data: {
        name: "Delivery Charges",
      },
      unit_amount: deliveryFee * 100,
    },
    quantity: 1,
  });

  try {
    let tempOrder = await temporaryOrderModel.create({
      userId: user._id,
      userName: userName,
      items: items,
      amount: totalPrice,
      address: address,
      paymentMethod: paymentMethod,
      date: Date.now(),
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: line_items,
      success_url: `${origin}/orderSuccess?tempOrder=${tempOrder._id}`,
      cancel_url: `${origin}/placeOrder`,
      metadata: {
        tempOrderId: tempOrder._id.toString(),
        userId: user._id.toString(),
      },
    });

    return res.json({ success: true, sessionUrl: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    return res.json({ success: false, message: error.message });
  }
};

const placeOrderRazorpay = async (req, res) => {
  let finalData = req.body.finalData;
  let { address, paymentMethod, items, totalPrice, userName } = finalData;
  let user = req.user;
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return res.status(500).json({
      success: false,
      message: "Razorpay credentials are not set up properly",
    });
  }
  if (!user || !user._id) {
    return res
      .status(401)
      .json({ success: false, message: "User not authenticated" });
  }
  if (!items || items.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No items in the order" });
  }
  if (!totalPrice || totalPrice <= 0) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid total price" });
  }
  if (!address || !address.trim()) {
    return res
      .status(400)
      .json({ success: false, message: "Address is required " });
  }
  if (!userName || !userName.trim()) {
    return res
      .status(400)
      .json({ success: false, message: "User name is required" });
  }
  // Initialize Razorpay instance

  const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  let options = {
    amount: totalPrice * 100, // amount in the smallest currency unit (e.g., paise for INR)
    currency: "INR",
    receipt: `receipt_${new Date().getTime()}`,
    notes: {
      userId: user._id.toString(),
      userName: userName,
      address: address,
      items: JSON.stringify(items),
      paymentMethod: paymentMethod,
    },
  };

  let order;
  try {
    order = await razorpayInstance.orders.create(options);
    console.log(order.id);

    if (!order) {
      return res
        .status(500)
        .json({ success: false, message: "Order creation failed" });
    }

    // Save the temporary order details in your database
    await temporaryOrderModel.create({
      userId: user._id,
      userName: userName,
      items: items,
      amount: totalPrice,
      address: address,
      paymentMethod: paymentMethod,
      date: Date.now(),
      razorpayOrderId: order.id,
    });

    return res.json({
      success: true,
      orderId: order.id,
      orderAmount: order.amount,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const verifyRazorpayPayment = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  let user = req.user;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (generatedSignature === signature) {
    try {
      const tempOrder = await temporaryOrderModel.findOneAndUpdate(
        { razorpayOrderId: orderId },
        { paymentStatus: "Paid" },
        { new: true }
      );

      if (!tempOrder) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }
      await orderModel.create({ ...tempOrder.toObject() });

      await temporaryOrderModel.deleteOne({ razorpayOrderId: orderId });
      await userModel.findOneAndUpdate({ _id: user._id }, { cartProducts: [] });
      return res.json({
        success: true,
        message: "Payment verified and order placed successfully",
      });
    } catch (error) {
      console.error("Error verifying Razorpay payment:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid payment signature",
    });
  }
};

const userOrders = async (req, res) => {
  let user = req.user;
  try {
    let getOrders = await orderModel.find({ userId: user._id });
    if (!getOrders) {
      return res.json({
        success: false,
        message: "No orders found",
      });
    }

    return res.json({ success: true, orders: getOrders });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// for admin

const updateStatus = async (req, res) => {
  let { orderId, orderStatus } = req.body;

  await orderModel.findOneAndUpdate(
    { _id: orderId },
    { orderStatus: orderStatus }
  );

  return res.json({
    success: true,
    message: "Order status updated successfully",
  });
};

const allOrders = async (req, res) => {
  try {
    let orderList = await orderModel.find({});
    return res.json({ success: true, orderList: orderList });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export {
  placeOrderCod,
  placeOrderStripe,
  placeOrderRazorpay,
  verifyRazorpayPayment,
  userOrders,
  updateStatus,
  allOrders,
};
