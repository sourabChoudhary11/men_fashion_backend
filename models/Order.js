import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        requred: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delievery", "cancelled"],
    default: "pending",
  },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
