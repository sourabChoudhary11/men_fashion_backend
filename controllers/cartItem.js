import CartItem from "../models/CartItem.js";

const GetUserCartItems= (req,res)=>{
  try{
    const {userId} = req.params;
    const cartItems = CartItem.find({userID:userId}).populate({
      path: "productID",
      select: "name images price quantity"
    });
    if(!cartItems) return next(new Error("invalid user id"))
    res.status(200).json({
      success: true,
      cartItems
    })
  }catch(err){
    next(err)
  }
};
const UpdateCartItem=(req,res)=>{
  try{
    const {id} = req.params;
    const {quantity} = req.body;
    const cartItem = CartItem.findByIdAndUpdate(id,{quantity:quantity},{new:true});
    if(!cartItem) return next(new Error("invalid item id"))
    res.status(200).json({
      success: true,
      message: "cart item updated successfully"
    })
  }catch(err){
    next(err)
  }
};
const DeleteCartItem=(req,res)=>{
  try{
    const {id} = req.params;
    const cartItem = CartItem.findByIdAndDelete(id);
    if(!cartItem) return next(new Error("invalid item id"))
    res.status(200).json({
      success: true,
      message: "cart item deleted successfully"
    })
  }catch(err){
    next(err)
  }
};
const AddCartItem=(req,res)=>{
  try{
    const {productId, userId, price, quantity} = req.body;
    const cartItem = new CartItem({
      productID:productId,
      userID:userId,
      price,
      quantity
    });
    cartItem.save();
    res.status(201).json({
      success: true,
      message: "cart item added successfully"
    })
  }catch(err){
    next(err)
  }
};


export {
  GetUserCartItems,
  UpdateCartItem,
  DeleteCartItem,
  AddCartItem,
}