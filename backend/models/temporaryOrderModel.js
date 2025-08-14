import mongoose from "mongoose";

const temporaryOrderSchema = mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: String, required: true },
  orderStatus: { type: String, required: true, default: "Order Placed" },
  paymentMethod: { type: String, required: true, default: "COD" },
  paymentStatus: { type: String, required: true, default: "Pending" },
  razorpayOrderId: { type: String, default: "" },
  razorpayPaymentId: { type: String, default: "" },
  date: { type: Number, required: true },
});

const temporaryOrderModel = mongoose.model(
  "temporaryOrder",
  temporaryOrderSchema
);

export default temporaryOrderModel;
