import Order from "../models/Order.js";
import Product from "../models/Product.js";

const GetMyOrders = async (req,res,next)=>{
  try{
    const {userId} = req.params;
    const orders = await Order.find({userId});
    
    res.status(200).json({
      success: true,
      orders
    });
  } catch(err){
    next(err);
  }
}
const PlaceOrder = async (req,res,next)=>{
  try{
    const order = new Order(req.body);
    order.save();
    
    req.body.items.forEach(async (i)=>{
      await Product.findByIdAndUpdate(i.productId,{
        $inc: {
          stock: -i.quantity
        }
      })
    })
    
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
    })
  } catch(err){
    next(err);
  }
}

export {
  GetMyOrders,
  PlaceOrder
}