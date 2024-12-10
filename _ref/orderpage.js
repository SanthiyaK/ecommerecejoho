"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // to redirect after successful order
import axios from 'axios';

const CheckoutPage = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]); // Cart data from context or props
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderStatus, setOrderStatus] = useState('');

  // Function to handle form input changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  // Calculate the total price of the cart
  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  // Handle order creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    
    // Get the order details
    const orderDetails = {
      orderItems: cart.map(item => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingInfo,
      itemsPrice: calculateTotalPrice(),
      taxPrice: (calculateTotalPrice() * 0.1).toFixed(2), // Assuming 10% tax
      shippingPrice: 10.00, // Flat shipping price
      totalPrice: (
        parseFloat(calculateTotalPrice()) +
        parseFloat((calculateTotalPrice() * 0.1).toFixed(2)) +
        10.00
      ).toFixed(2),
      paymentInfo: { id: 'samplePaymentId', status: 'Paid' },
    };

    try {
      const response = await axios.post('/api/orders', orderDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setOrderStatus('Order placed successfully!');
        setCart([]); // Clear the cart after order is placed
        router.push('/order-success'); // Redirect to a success page
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="cart-summary">
        <h2>Your Cart</h2>
        <ul>
          {cart.map(item => (
            <li key={item._id}>
              <span>{item.name} x {item.quantity}</span> - ${item.price * item.quantity}
            </li>
          ))}
        </ul>
        <div className="total-price">
          <strong>Total Price: ${calculateTotalPrice()}</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <h2>Shipping Information</h2>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={shippingInfo.address}
            onChange={handleShippingChange}
            required
          />
        </div>

        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingInfo.city}
            onChange={handleShippingChange}
            required
          />
        </div>

        <div>
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleShippingChange}
            required
          />
        </div>

        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={shippingInfo.country}
            onChange={handleShippingChange}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {orderStatus && <p className="success-message">{orderStatus}</p>}

        <div className="actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
