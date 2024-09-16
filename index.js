import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import {GetCookie} from "./middlewares/auth.js";
import cartItemRoute from "./routes/cartItem.js";
import PayNow from "./controllers/payNow.js";

dotenv.config();

const port = process.env.PORT || 3000;
console.log(port);

connectDB();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URI, 
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type',
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ extendet: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// specify the routes
app.get("/get-cookie", GetCookie);
app.post("/pay-now", PayNow);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/cart", cartItemRoute);

app.get("*", (req, res) => {
  res.status(404).send(`404 - Page Not Found`);
});

app.listen(port, () => {
  console.log("Server is running on port 8080");
});

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
});
