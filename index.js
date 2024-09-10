import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import {authVerification} from "./middlewares/auth.js";

dotenv.config();

const port = process.env.PORT || 3000;
console.log(port);

// connect mongodb database
connectDB();

// making server
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ extendet: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// specify the routes
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.post("/auth/verify", authVerification);

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
