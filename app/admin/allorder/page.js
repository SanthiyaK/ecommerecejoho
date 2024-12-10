"use client"
import { getOrders } from "@/app/action/AdminGetOrders"; // Assuming this function fetches the orders from the API
import Link from "next/link"; // For navigation between pages
import { useEffect, useState } from "react"; // For client-side rendering

export default function OrderList() {
  const [orders, setOrders] = useState([]); // State to hold orders

  // Fetch orders on the client-side (after initial server render)
  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrders(); // Fetch orders from the server
      setOrders(fetchedOrders); // Update state with fetched orders
    };

    fetchOrders();
  }, []); // Empty dependency array to only run once after initial render

  return (
    <div className="p-8 bg-gradient-to-r from-green-400 via-teal-500 to-cyan-600 text-white shadow-xl rounded-lg">
      <h2 className="text-4xl font-bold text-center mb-8">Order Summary</h2>

      <div className="space-y-10">
        {orders.map((order) => (
          <div key={order._id} className="p-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white text-gray-800">
            {/* Order ID and Total Price */}
            <div className="mb-4">
              <p className="font-semibold text-xl text-indigo-600">Order ID: <span className="text-gray-700">{order._id}</span></p>
              <p className="font-semibold text-xl text-green-500">Total Price: <span className="text-gray-700">${order.totalPrice}</span></p>
              <p className="font-semibold text-xl text-green-500">Total with Discount Price: <span className="text-gray-700">${order.itemsPrice}</span></p>
              {/* Order Date */}
              <p className="font-medium text-lg text-gray-600">Order Date: <span>{new Date(order.createdAt).toLocaleString()}</span></p>
            </div>

            {/* Tax and Shipping Price */}
            <div className="mb-4">
              <div className="flex justify-between">
                <p className="font-medium text-lg text-yellow-500">Tax Price: <span className="text-gray-700">${order.taxPrice}</span></p>
                <p className="font-medium text-lg text-blue-500">Shipping Price: <span className="text-gray-700">${order.shippingPrice}</span></p>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mb-6">
              <p className="font-semibold text-lg text-gray-800">Shipping Information</p>
              <div className="mt-3 space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-600 w-32">Name:</span>
                  <span>{order.shippingInfo.fullName}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-600 w-32">Address:</span>
                  <span>{order.shippingInfo.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-600 w-32">City:</span>
                  <span>{order.shippingInfo.city}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-600 w-32">Postal Code:</span>
                  <span>{order.shippingInfo.postalCode}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-600 w-32">Phone Number:</span>
                  <span>{order.shippingInfo.phoneNumber}</span>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="mb-6">
              <p className="font-semibold text-lg text-gray-800">Items</p>
              <table className="min-w-full table-auto mt-2 border-collapse text-gray-800">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">Product</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">${item.price}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Price Summary Below Product Table */}
            <div className="flex justify-between mt-4 border-t pt-4 text-lg font-semibold text-gray-800">
              <p>Total Price: <span className="text-green-600">${order.totalPrice}</span></p>
              <p>Tax: <span className="text-yellow-600">${order.taxPrice}</span></p>
              <p>Shipping: <span className="text-blue-600">${order.shippingPrice}</span></p>
              <p>Total with Discount Price: <span className="text-blue-600">${order.itemsPrice}</span></p>          
            </div>

            {/* User Details */}
            <div className="mt-6">
              <p className="font-semibold text-lg text-gray-800">User Details</p>
              <table className="min-w-full table-auto mt-2">
                <tbody>
                  <tr>
                    <td className="px-4 py-2 font-medium text-gray-600">Name:</td>
                    <td className="px-4 py-2">{order.user.name}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-gray-600">Email:</td>
                    <td className="px-4 py-2">{order.user.email}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-gray-600">Phone:</td>
                    <td className="px-4 py-2">{order.user.phone}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-center mt-6">
              <Link href={`/admin/Order/${order._id}`}>
                <button className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600">
                  View Order Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
