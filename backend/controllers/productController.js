import productModel from "../models/productModel.js";
import cloudinary from "cloudinary";

const addProduct = async (req, res) => {
  try {
    let {
      name,
      description,
      price,
      sizes,
      category,
      subCategory,
      bestSeller,
      date,
    } = req.body;

    let images = req.files; //req.files is an object of arrays of objects..
    let imageUrls = [];

    for (let image in images) {
      for (let file of images[image]) {
        let result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }
    }

    let existingProduct = await productModel.findOne({ name });

    if (existingProduct) {
      return res.json({
        success: false,
        message: "Product with the name already exists in db",
      });
    }

    let newProduct = new productModel({
      name,
      description,
      price: Number(price),
      sizes: JSON.parse(sizes),
      image: imageUrls,
      category,
      subCategory,
      bestSeller,
      date,
    });

    await newProduct.save();
    return res.json({
      success: true,
      message: "Product successfully added to db",
    });
  } catch (error) {
   
    return res.json({ success: false, message: error.message });
  }
};
const removeProduct = async (req, res) => {
  let { id } = req.body;

  if (!id) {
    return res.json({ success: false, message: "Product ID required" });
  }

  try {
    let deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }
    return res.json({ success: true, message: "Product successfully deleted" });
  } catch (error) {
    
    return res.json({ success: false, message: error.message });
  }
};
const listAllProducts = async (req, res) => {
  try {
    let products = await productModel.find({});
    return res.json({ success: true, products });
  } catch (error) {
    
    return res.json({ success: false, message: error.message });
  }
};
const singleProductInfo = async (req, res) => {
  let { id } = req.body;

  if (!id) {
    return res.json({ success: false, message: "Product ID required" });
  }

  try {
    let requiredProduct = await productModel.findById(id);
    if (!requiredProduct) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }
    return res.json({ success: true, requiredProduct });
  } catch (error) {
   
    return res.json({ success: false, message: error.message });
  }
};

export { addProduct, removeProduct, listAllProducts, singleProductInfo };
