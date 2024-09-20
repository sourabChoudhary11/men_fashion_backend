import express from "express";
import {CreateOrder, VerifyPayment} from "../controllers/payment.js";

const paymentRoute = express.Router();

paymentRoute.post("/create-order",CreateOrder);
paymentRoute.post("/verify-payment",VerifyPayment);

export default paymentRoute
