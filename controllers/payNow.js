import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PayNow = async (req, res, next) => {
    const { amount, currency } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });
  
      res.json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      next(error);
    }
  }

export default PayNow