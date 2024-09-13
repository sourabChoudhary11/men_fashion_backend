import CartItem from "../models/CartItem.js";

const GetUserCartItems=async (req,res,next)=>{
  try{
    const {userId} = req.params;
    const cartItems = await CartItem.find({userID:userId}).populate({
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
const UpdateCartItem=async (req,res,next)=>{
  try{
    const {id} = req.params;
    const {quantity} = req.body;
    const cartItem = await CartItem.findByIdAndUpdate(id,{quantity:quantity},{new:true});
    if(!cartItem) return next(new Error("invalid item id"))
    res.status(200).json({
      success: true,
      message: "cart item updated successfully"
    })
  }catch(err){
    next(err)
  }
};
const DeleteCartItem=async (req,res,next)=>{
  try{
    const {id} = req.params;
    const cartItem = await CartItem.findByIdAndDelete(id);
    if(!cartItem) return next(new Error("invalid item id"))
    res.status(200).json({
      success: true,
      message: "cart item deleted successfully"
    })
  }catch(err){
    next(err)
  }
};
const AddCartItem=(req,res,next)=>{
  console.log("run add cart item")
  try{
    const {productID, userID, price, quantity} = req.body;
    const cartItem = new CartItem({
      productID,
      userID,
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