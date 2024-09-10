import express from "express"
import {GetMyOrders, PlaceOrder} from "../controllers/order.js"

const orderRoute = express.Router()

orderRoute.get("/all/:userId", GetMyOrders)
orderRoute.post("/new", PlaceOrder)

export default orderRoute