import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PayNow = async (req, res, next) => {
    const { amount, customerName, customerAddress, customerCity, customerState, customerCountry, customerPostalCode } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "inr",
        description: "Export of men's casual and formal wear, including shirts, jeans, shoes, perfume and watch",
        metadata: {
         customerName,
        customerAddress,
        customerCity,
        customerState,
        customerCountry,
        customerPostalCode,
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
