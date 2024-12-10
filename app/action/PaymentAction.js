"use server"
import Stripe from 'stripe';
import Razorpay from 'razorpay';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// Razorpay configuration
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
});

// Create Stripe payment intent
export async function createPaymentIntent(totalPrice) {
  const amount = Math.round(parseFloat(totalPrice) * 100); // Convert to cents

  try {
    // Create a payment intent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      description: 'Test Payment',
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Stripe error:", error);
    throw new Error("Failed to create Stripe payment intent.");
  }
}

// Create Razorpay order
export async function createRazorpayOrder(amount) {
  const orderOptions = {
    amount: amount * 100, // Amount in paise (1 INR = 100 paise)
    currency: 'INR',
    receipt: `order_rcptid_${Math.floor(Math.random() * 1000)}`,
    payment_capture: 1, // Automatically capture payment
  };

  
    console.log("Creating Razorpay order with options:", orderOptions);
    const order = await razorpay.orders.create(orderOptions);
    return order;
   /* catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw new Error(`Failed to create Razorpay order: ${error.message || error}`);
  } */
}
