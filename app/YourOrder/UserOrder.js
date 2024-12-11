"use client";
import { useEffect, useState } from "react";
import { getUserOrderItem } from "../action/UserOrderedItem";

export default function UserOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId"); // Get userId from localStorage

      if (!userId) {
        setError("You need to be logged in to view your orders.");
        setLoading(false);
        return;
      }

      try {
        const response = await getUserOrderItem(userId); // Fetch user orders
        if (response.error) {
          setError(response.error);
        } else {
          setOrders(response.orders); // Set the orders if fetched successfully
        }
      } catch (error) {
        setError("There was an error fetching your orders. Please try again later.");
      } finally {
        setLoading(false); // Ensure loading state is set to false when finished
      }
    };

    fetchOrders(); // Fetch orders when component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  // Show loading message while fetching data
  if (loading) {
    return <div className="text-center py-6 text-xl">Loading your orders...</div>;
  }

  // Show error message if there was an issue fetching the orders
  if (error) {
    return <div className="text-center py-6 text-xl text-red-500">{error}</div>;
  }

  // Render orders if they are available
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-8">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-xl">You have no orders yet.</p> // Message if no orders are found
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Order #{order._id}</h3>
              <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-lg font-bold mt-2 text-gray-900">Total with discount Price: <span className="text-teal-600">${order.totalPrice}</span></p>
              
              <div className="order-items mt-4">
                <h4 className="text-lg font-semibold text-gray-800">Items:</h4>
                <ul className="list-disc pl-6 mt-2">
                  {order.items.map((item) => (
                    <li key={item.productId} className="text-gray-700">
                      <strong>{item.name}</strong> ({item.size}) x {item.quantity} - ${item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="shipping-info mt-4">
                <h4 className="text-lg font-semibold text-gray-800">Shipping Information:</h4>
                <p className="text-gray-700">{order.shippingInfo.fullName}</p>
                <p className="text-gray-700">{order.shippingInfo.address}</p>
                <p className="text-gray-700">{order.shippingInfo.city}, {order.shippingInfo.postalCode}</p>
                <p className="text-gray-700">{order.shippingInfo.country}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
