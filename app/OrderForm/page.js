'use client'

import { useEffect, useState } from 'react';
import { createOrder } from '../action/OrderAction';

export default function OrderForm() {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};
    const userId = localStorage.getItem('userId'); // Retrieve userId directly as string

    // Check if userId is available
    if (!userId) {
      setError('User is not authenticated!');
      setLoading(false);
      return;
    }

    // Retrieve prices from localStorage
    const itemsPrice = JSON.parse(localStorage.getItem('itemsPrice')) || 0;
    const taxPrice = JSON.parse(localStorage.getItem('taxPrice')) || 0;
    const shippingPrice = JSON.parse(localStorage.getItem('shippingPrice')) || 0;
    const totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0;

    const savedOrderData = localStorage.getItem('orderDetails');
    if (savedOrderData) {
      setOrderData(JSON.parse(savedOrderData));
    } else {
      setError('No order data found!');
      setLoading(false);
      return;
    }

    setOrderData({
      ...orderData,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    setLoading(false);
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
  

    // If orderData is not yet available, stop the submission
    if (!orderData) {
      console.error('Order data not available!');
      return;
    }

    const updatedOrderData = {
      ...orderData,
      paymentInfo: {
        id: 'somePaymentId',
        status: 'succeeded',
      },
      user: '60d0fe4f5311236168a109f3',
    };

    try {
      const newOrder = await createOrder(updatedOrderData);
      console.log('Order created:', newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      setError('There was an error creating your order. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading order data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={orderData.shippingInfo.fullName}
          onChange={(e) => {
            setOrderData({
              ...orderData,
              shippingInfo: {
                ...orderData.shippingInfo,
                fullName: e.target.value,
              },
            });
          }}
        />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          value={orderData.shippingInfo.address}
          onChange={(e) => {
            setOrderData({
              ...orderData,
              shippingInfo: {
                ...orderData.shippingInfo,
                address: e.target.value,
              },
            });
          }}
        />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          value={orderData.shippingInfo.city}
          onChange={(e) => {
            setOrderData({
              ...orderData,
              shippingInfo: {
                ...orderData.shippingInfo,
                city: e.target.value,
              },
            });
          }}
        />
      </div>
      <div>
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={orderData.shippingInfo.postalCode}
          onChange={(e) => {
            setOrderData({
              ...orderData,
              shippingInfo: {
                ...orderData.shippingInfo,
                postalCode: e.target.value,
              },
            });
          }}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={orderData.shippingInfo.phoneNumber}
          onChange={(e) => {
            setOrderData({
              ...orderData,
              shippingInfo: {
                ...orderData.shippingInfo,
                phoneNumber: e.target.value,
              },
            });
          }}
        />
      </div>

      <div>
        <p><strong>Items Price:</strong> ${orderData.itemsPrice.toFixed(2)}</p>
        <p><strong>Tax Price:</strong> ${orderData.taxPrice.toFixed(2)}</p>
        <p><strong>Shipping Price:</strong> ${orderData.shippingPrice.toFixed(2)}</p>
        <p><strong>Total Price:</strong> ${orderData.totalPrice.toFixed(2)}</p>
      </div>

      <button type="submit">Create Order</button>
    </form>
  );
}
