import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PayNow = async (req, res, next) => {
    const { amount, customerName, customerAddress } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "inr",
        description: "Export of men's casual and formal wear, including shirts, jeans, shoes, perfume and watch",
        metadata: {
        customerName,
        customerAddress,
          }
      });
  
      res.json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      next(error);
    }
  }

export default PayNow
