import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: Array, default: [] },
  sizes: { type: Array, default: [] },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  bestSeller: { type: Boolean, required: true },
  date: { type: Number, default: Date.now() },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
