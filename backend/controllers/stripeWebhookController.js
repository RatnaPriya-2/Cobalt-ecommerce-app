import Stripe from "stripe";
import temporaryOrderModel from "../models/temporaryOrderModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = new Stripe(stripeSecretKey);

const StripeWebhookController = async (req, res) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      stripeWebhookSecret
    );
    console.log("✅ Event verified:", event.type);
  } catch (err) {
    console.error("❌ Stripe webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "payment_intent.succeeded"
  ) {
    let session = event.data.object;
    let userId = session.metadata.userId;
    console.log("💳 Checkout session:", session);

    let tempOrderId = session.metadata.tempOrderId;

    let getTempOrder = await temporaryOrderModel.findOneAndUpdate(
      { _id: tempOrderId },
      { paymentStatus: "Completed" },
      { new: true }
    );

    if (!getTempOrder) {
      console.error("⚠️ No tempOrderId found in DB");
      return res.json({ success: false, message: "No tempOrderId found" });
    }

    let newOrder = getTempOrder.toObject();
    delete newOrder._id;

    let createOrder = await orderModel.create({
      ...newOrder,
      tempOrderId: getTempOrder._id.toString(),
    });

    if (createOrder) {
      await temporaryOrderModel.findByIdAndDelete(tempOrderId);
      await userModel.findOneAndUpdate({ _id: userId }, { cartProducts: [] });

      res.status(200).end();
    } else {
      console.error("❌ Error placing order");
      return res.json({ success: false, message: "Error placing Order" });
    }
  } else {
    console.log("⚠️ Unhandled event type:", event.type);
    res.status(200).end();
  }
};

export default StripeWebhookController;
