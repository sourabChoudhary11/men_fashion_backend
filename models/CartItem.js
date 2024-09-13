import mongoose from "mongoose"

const CartItemSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
})

const CartItem = mongoose.model("CartItem",CartItemSchema);

export default CartItem