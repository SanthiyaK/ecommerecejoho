"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "../action/OrderAction";


export default function CheckoutPage({ cart, userId }) {
  const router = useRouter();
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderStatus, setOrderStatus] = useState('');

  // Handle form input changes
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Prepare order details
    const orderDetails = {
      orderItems: cart.map(item => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingInfo,
      itemsPrice: calculateTotalPrice(),
      taxPrice: (calculateTotalPrice() * 0.1).toFixed(2), // 10% tax
      shippingPrice: 10.00, // Flat shipping price
      totalPrice: (
        parseFloat(calculateTotalPrice()) +
        parseFloat((calculateTotalPrice() * 0.1).toFixed(2)) +
        10.00
      ).toFixed(2),
    };

    try {
      // Call the server action to create the order
      const order = await createOrder(orderDetails, userId);

      // Order successfully created
      if (order) {
        setOrderStatus('Order placed successfully!');
        setCart([]); // Clear the cart after placing the order
        router.push('/order-success'); // Redirect to the order success page
      }
    } catch (error) {
      setError(error.message || 'An error occurred.');
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

       {/*  {error && <p className="error-message">{error}</p>}
        {orderStatus && <p className="success-message">{orderStatus}</p>}

        <div className="actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div> */}
      </form>
    </div>
  );
}
