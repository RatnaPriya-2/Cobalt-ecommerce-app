import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const adminAuth = async (req, res, next) => {
  let token = req.cookies.adminToken;
  try {
    if (!token) {
      return res.json({
        success: false,
        message: "No token provided. Unauthorized.",
      });
    }

    let decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    if (
      decodedToken.email !== process.env.ADMIN_EMAIL &&
      decodedToken.role !== "admin"
    ) {
      return res.json({ success: false, message: "Not admin, not authorised" });
    }

    req.admin = decodedToken;
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
