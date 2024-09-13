import express from "express"

const cartItemRoute = express.Router();

cartItemRoute.get("/:userId", GetUserCartItems);
cartItemRoute.route("/:id").put(UpdateCartItem).delete(DeleteCartItem);
cartItemRoute.post("/new", AddCartItem);

export default cartItemRoute