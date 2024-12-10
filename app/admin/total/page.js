"use client";
import React, { useState, useEffect } from 'react';
import { getOrders } from "@/app/action/AdminGetOrders"; // Function to get all orders
import { fetchProducts } from "@/app/action/Productsaction"; // Function to get all products

export default function AdminDashboard() {
  const [totals, setTotals] = useState({
    totalOrders: 0,
    totalStock: 0,
    totalPrice: 0,  // Total price of all orders
  });
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  // Function to format numbers into currency
  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString()}`;
  };
  
  useEffect(() => {
    const fetchTotals = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        // Fetch products and orders asynchronously
        const fetchedProducts = await fetchProducts();
        if (!fetchedProducts) throw new Error('Failed to fetch products');

        const orders = await getOrders();
        if (!orders) throw new Error('Failed to fetch orders');

        // Calculate total stock based on sizes
        const totalStock = fetchedProducts.reduce((sum, product) => {
          // Calculate stock for each size (XS, S, M, L, XL, XXL)
          const sizesStock = Object.values(product.sizes).reduce((sizeSum, size) => {
            return sizeSum + size.stock;
          }, 0);
          return sum + sizesStock; // Add to total stock
        }, 0);

        // Calculate total price (sum of price * quantity for all orders)
        const totalPrice = orders.reduce((acc, order) => acc + order.totalPrice, 0);

        // Calculate total number of orders
        const totalOrders = orders.length;

        // Update the state with calculated totals
        setTotals({
          totalOrders,
          totalStock,
          totalPrice,
        });

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);  // Log the actual error for better debugging
        setError("Failed to fetch data. Please try again later.");
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchTotals();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  if (loading) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg flex justify-center items-center">
        <p className="text-lg text-gray-700">Loading...</p> {/* Loading message */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
        <p className="text-red-500">{error}</p> {/* Error message */}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Orders */}
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold mb-4">Total Orders</h3>
          <p className="text-lg font-bold">{totals.totalOrders}</p>
        </div>

        {/* Total Stock */}
        <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold mb-4">Total Stock</h3>
          <p className="text-lg font-bold">{totals.totalStock}</p>
        </div>

        {/* Total Price */}
        <div className="bg-purple-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold mb-4">Total Order Price</h3>
          <p className="text-lg font-bold">{formatCurrency(totals.totalPrice)}</p>
        </div>
      </div>
    </div>
  );
}
