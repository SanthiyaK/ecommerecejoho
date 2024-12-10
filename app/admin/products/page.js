"use client";
import { useState } from "react";
import { addProduct } from "@/app/action/AdminAddProduct"; // Import the server action
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminPage() {
  const [prices, setPrices] = useState({
    XS: 0,
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    XXL: 0,
  });
  const [stocks, setStocks] = useState({
    XS: 0,
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    XXL: 0,
  });

  // Handle size price change
  const handleSizePriceChange = (size, newPrice) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [size]: newPrice,
    }));
  };

  // Handle size stock change
  const handleSizeStockChange = (size, newStock) => {
    setStocks((prevStocks) => ({
      ...prevStocks,
      [size]: newStock,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(e.target);

    // Adding prices and stocks for each size into the formData
    for (let size of ["XS", "S", "M", "L", "XL", "XXL"]) {
      formData.append(`${size}_price`, prices[size]);
      formData.append(`${size}_stock`, stocks[size]);
    }

    try {
      const result = await addProduct(formData); // Call the server action for product creation

      // Show appropriate toast message based on the result
      if (result.success) {
        toast.success(result.message, {
          position: "top-center", // Changed to string directly
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored",
        });
      } else {
        toast.error(result.message, {
          position: "top-center", // Changed to string directly
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("An error occurred while adding the product.", {
        position: "top-center", // Changed to string directly
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 shadow-2xl rounded-3xl">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Admin Dashboard - Add New Product</h1>

      {/* Toast Container outside of form */}
      <ToastContainer /> 

      {/* Form to add a product */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        
        {/* Product Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-white">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter product name"
            required
            className="mt-2 p-4 block w-full border-2 border-teal-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Product Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-white">Product Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter product description"
            required
            className="mt-2 p-4 block w-full border-2 border-teal-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Base Product Price */}
        <div className="mb-6">
          <label htmlFor="price" className="block text-sm font-medium text-white">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter base price"
            required
            className="mt-2 p-4 block w-full border-2 border-teal-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Size-specific prices and stock */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size}>
              <label htmlFor={`size_${size}_price`} className="block text-sm font-medium text-white">{`${size} Price`}</label>
              <input
                type="number"
                name={`size_${size}_price`}
                id={`size_${size}_price`}
                value={prices[size] || ''} // Ensure it's not NaN
                onChange={(e) => handleSizePriceChange(size, parseFloat(e.target.value))}
                placeholder={`Price for ${size}`}
                className="mt-2 p-4 block w-full border-2 border-teal-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <label htmlFor={`size_${size}_stock`} className="block text-sm font-medium text-white">{`${size} Stock`}</label>
              <input
                type="number"
                name={`size_${size}_stock`}
                id={`size_${size}_stock`}
                value={stocks[size] || ''} // Ensure it's not NaN
                onChange={(e) => handleSizeStockChange(size, parseInt(e.target.value, 10))}
                placeholder={`Stock for ${size}`}
                className="mt-2 p-4 block w-full border-2 border-teal-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          ))}
        </div>

        {/* Discount Percentage */}
        <div className="mb-6">
          <label htmlFor="discountPercentage" className="block text-sm font-medium text-white">Discount Percentage</label>
          <input
            type="number"
            name="discountPercentage"
            id="discountPercentage"
            placeholder="Enter discount percentage"
            required
            className="mt-2 p-4 block w-full border-2 border-teal-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Product Image File Upload */}
        <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-medium text-white">Product Images</label>
          <input
            type="file"
            name="image"
            id="image"
            multiple
            required
            accept="image/*"
            className="mt-2 p-4 block w-full border-2 border-teal-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
          {/* Product Image File Upload */}
          <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-medium text-white">Product Images</label>
          <input
            type="file"
            name="image"
            id="image"
            multiple
            required
            accept="image/*"
            className="mt-2 p-4 block w-full border-2 border-teal-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Product Category */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-white">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Enter product category"
            required
            className="mt-2 p-4 block w-full border-2 border-teal-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Product Stock */}
        <div className="mb-6">
          <label htmlFor="stock" className="block text-sm font-medium text-white">Stock</label>
          <input
            type="number"
            name="stock"
            id="stock"
            placeholder="Enter total product stock"
            required
            className="mt-2 p-4 block w-full border-2 border-teal-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Submit Button */}
        <div className="mb-6 space-y-4">
          <button
            type="submit"
            className="w-full py-3 px-5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition ease-in-out duration-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
