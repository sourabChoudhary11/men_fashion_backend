import express from "express";
import {CreateOrder} from "../controllers/payment.js";

const paymentRoute = express.Router();

paymentRoute.post("/create-order",CreateOrder);

export default paymentRoute
