"use client";
import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../action/PaymentAction";
import { useRouter } from "next/navigation";
import { createOrder } from "../action/OrderAction";

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [itemsPrice, setItemsPrice] = useState(null);
  const [shippingPrice, setShippingPrice] = useState(null);
  const [taxPrice, setTaxPrice] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);  // Track selected payment method
  const [paymentStatus, setPaymentStatus] = useState(null);  // Track payment status (loading, success, error)

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  // Load Razorpay script dynamically
  useEffect(() => {
    if (typeof window !== "undefined" && !window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => console.log("Razorpay script loaded.");
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const orderInfo = sessionStorage.getItem("orderInfo");

    if (orderInfo) {
      const { totalPrice, itemsPrice, shippingPrice, taxPrice } = JSON.parse(orderInfo);
      setTotalPrice(totalPrice);
      setItemsPrice(itemsPrice);
      setShippingPrice(shippingPrice);
      setTaxPrice(taxPrice);

      // If Stripe is selected, create a payment intent
      if (paymentMethod === "stripe") {
        async function getPaymentIntent() {
          const result = await createPaymentIntent(totalPrice); // Pass the total price to backend for Stripe Payment Intent
          if (result && result.clientSecret) {
            setClientSecret(result.clientSecret);
          } else {
            console.error("Failed to create payment intent.");
            setPaymentStatus("error");
          }
        }
        getPaymentIntent();
      }
    } else {
      console.log("No order information found.");
      setPaymentStatus("error");
    }
  }, [paymentMethod]);

  // Handle Stripe payment
  const handleStripePayment = async (event) => {
    event.preventDefault(); // Prevent form submission to ensure Stripe payment is handled correctly

    if (!stripe || !elements || !clientSecret) {
      setPaymentStatus("error");
      return; // Stripe.js has not loaded or elements are not ready
    }

    const cardElement = elements.getElement(CardElement);
    setPaymentStatus("loading"); // Show loading state while waiting for payment confirmation

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        console.error("Stripe error:", error);
        setPaymentStatus("error");
      } else {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          throw new Error("User ID is not found. Please log in again.");
        }

        const cartItems = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
        const storedShippingInfo = JSON.parse(localStorage.getItem(`shippingInfo_${userId}`)) || {};

        const newOrder = await createOrder(totalPrice, itemsPrice, shippingPrice, taxPrice, cartItems, userId, storedShippingInfo);
        console.log("Order created:", newOrder);

        if (paymentIntent.status === "succeeded") {
          setPaymentStatus("success");
          localStorage.removeItem(`cart_${userId}`); // Clear cart after successful payment

          setTimeout(() => {
            router.push("/payment-success");  // Redirect to payment success page
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setPaymentStatus("error");
    }
  };

  // Handle Razorpay payment
  const handleRazorpayPayment = () => {
    if (!totalPrice) {
      setPaymentStatus("error");
      return; // Ensure the total price is available
    }

    if (typeof window !== "undefined" && window.Razorpay) {
      const razorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay Key ID
        amount: totalPrice * 100, // Amount in paise (Razorpay requires the amount in paise)
        currency: "INR",
        name: "Your Company",
        description: "Payment for service",
        handler: function (response) {
          console.log("Razorpay payment success:", response);

          const userId = localStorage.getItem("userId");
          if (!userId) {
            throw new Error("User ID is not found.");
          }

          const cartItems = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
          const storedShippingInfo = JSON.parse(localStorage.getItem(`shippingInfo_${userId}`)) || {};

          createOrder(totalPrice, itemsPrice, shippingPrice, taxPrice, cartItems, userId, storedShippingInfo);
          localStorage.removeItem(`cart_${userId}`);

          setPaymentStatus("success");

          setTimeout(() => {
            router.push("/payment-success");  // Redirect to payment success page
          }, 2000);
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpayObject = new window.Razorpay(razorpayOptions);
      razorpayObject.open();
    } else {
      console.error("Razorpay script is not loaded correctly.");
      setPaymentStatus("error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Payment Page</h2>

      {paymentStatus === "loading" && <p className="text-gray-500">Processing payment...</p>}

      {paymentStatus === "success" ? (
        <div className="text-green-500">
          <h3 className="text-2xl font-semibold">Payment Successful!</h3>
          <p className="mt-2">Thank you for your purchase! Your payment has been successfully processed.</p>
        </div>
      ) : paymentStatus === "error" ? (
        <div className="text-red-500">
          <h3 className="text-2xl font-semibold">Payment Failed</h3>
          <p className="mt-2">There was an error processing your payment. Please try again later.</p>
        </div>
      ) : (
        <>
          {/* Button to select payment method */}
          <button
            onClick={() => setPaymentMethod("stripe")}
            className={`w-full py-3 ${paymentMethod === "stripe" ? "bg-blue-500" : "bg-gray-300"} text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none`}
          >
            Pay with Stripe
          </button>

          <button
            onClick={() => setPaymentMethod("razorpay")}
            className={`w-full py-3 ${paymentMethod === "razorpay" ? "bg-blue-500" : "bg-gray-300"} text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none mt-4`}
          >
            Pay with Razorpay (UPI, Google Pay, Paytm) ₹{totalPrice}
          </button>

          {/* Handle Stripe payment */}
          {paymentMethod === "stripe" && clientSecret ? (
            <form onSubmit={handleStripePayment} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="card-element" className="block text-sm font-medium text-gray-700">
                  Card Information
                </label>
                <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
                  <CardElement
                    id="card-element"
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#32325d',
                          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                          fontSmoothing: 'antialiased',
                          "::placeholder": {
                            color: '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#fa755a',
                          iconColor: '#fa755a',
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={!stripe || paymentStatus === "loading"}
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
              >
                Pay ₹{totalPrice}
              </button>
            </form>
          ) : paymentMethod === "razorpay" ? (
            <button
              onClick={handleRazorpayPayment}
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none mt-4"
            >
              Proceed to Razorpay
            </button>
          ) : (
            <p>Choose the Payment type above...</p>
          )}
        </>
      )}
    </div>
  );
}
