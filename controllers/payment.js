import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const CreateOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // Amount in paise
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Order creation failed', error });
  }
}

const VerifyPayment = (req,res)=>{
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');
  
  if(generated_signature === razorpay_signature) res.status(200).json({
    success: true,
    message: "Payment is Successful"
  })
  else res.status(400).json({
    success: false,
    message: "Payment is Failed"
  })
}

export {
  CreateOrder,
  VerifyPayment
}
