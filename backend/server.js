import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongooseConfig.js";
import userRouter from "./routes/userRouter.js";
import connectCloudinary from "./config/cloudinaryConfig.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";
import webhookRouter from "./routes/webhookRouter.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = [
  "https://cobalt-ecommerce-user-frontend.netlify.app/",
  "https://cobalt-ecommerce-admin-frontend.netlify.app/",
];

connectDB();
connectCloudinary();

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // allow cookies to be sent
  })
);

app.use(cookieParser());

app.use("/api/webhook", webhookRouter);
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  return res.json("app is running");
});

app.listen(port, () => console.log("Server is running on port " + port));
