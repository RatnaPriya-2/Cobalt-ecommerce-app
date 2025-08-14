import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userModel from "../models/userModel.js";

dotenv.config();

const userAuth = async (req, res, next) => {
  let token = req.cookies.userToken;

  try {
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorised, please login to continue",
      });
    }

    let decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    let user = await userModel.findOne({ _id: decodedToken.id });

    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;
