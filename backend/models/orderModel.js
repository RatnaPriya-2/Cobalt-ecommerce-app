import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: String, required: true },
  orderStatus: { type: String, required: true, default: "Order Placed" },
  paymentMethod: { type: String, required: true, default: "COD" },
  paymentStatus: { type: String, required: true, default: "Pending" },
  date: { type: Number, required: true },
  tempOrderId: { type: String },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
