import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validator from "validator";
import orderModel from "../models/orderModel.js";

dotenv.config();

const createToken = (id) => {
  const token = jwt.sign({ id, role: "user" }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  return token;
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email ID" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be atleast 8 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const userToken = createToken(newUser._id);

    res.cookie("userToken", userToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const userToken = createToken(user._id);

    res.cookie("userToken", userToken, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "User logged in successfully",
      userToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    console.log(object.keys(req.cookies));
    let token = req.cookies.userToken;
    console.log(token);

    if (!token) {
      return res.json({
        success: false,
        message: "no token found",
      });
    }

    res.cookie("userToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 0,
    });
    return res.status(201).json({
      success: true,
      message: "User logged out sucessfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const verifyOrder = async (req, res) => {
  let tempOrderId = req.body.tempOrderId;
  console.log(typeof tempOrderId);
  console.log(tempOrderId);
  try {
    let foundOrder = await orderModel.findOne({
      tempOrderId: tempOrderId,
    });
    if (!foundOrder) {
      return res.json({ success: false, message: "Order not found" });
    }

    return res.json({
      success: true,
      message: "Order Placed Successfully",
      foundOrder,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
const adminLogin = async (req, res) => {
  let { email, password } = req.body;
  try {
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Invalid credentials, not authorised to login",
      });
    }
    let adminToken = jwt.sign(
      { email: email, role: "admin" },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("adminToken", adminToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(201).json({
      success: true,
      message: "Admin logged in sucessfully",
      adminToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const adminLogout = async (req, res) => {
  let token = req.cookies.adminToken;

  try {
    if (!token) {
      return res.json({
        success: false,
        message: "no token found",
      });
    }

    res.cookie("adminToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 0,
    });
    return res.status(201).json({
      success: true,
      message: "Admin logged out sucessfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { register, login, adminLogin, adminLogout, logout, verifyOrder };
