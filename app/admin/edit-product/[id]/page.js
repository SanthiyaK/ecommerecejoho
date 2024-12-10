"use client";

import { editProduct } from "@/app/action/AdminEditProduct";
import fetchProduct from "@/app/action/Productaction";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminPage({ params }) {
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState(null);
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

  // Fetch product data on page load
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const { id } = await params; // Get product ID from params
        const productData = await fetchProduct(id); // Fetch product by ID
        setProduct(productData); // Store product data in state

        // Set initial price and stock values for each size
        setPrices({
          XS: productData.size_XS_price || 0,
          S: productData.size_S_price || 0,
          M: productData.size_M_price || 0,
          L: productData.size_L_price || 0,
          XL: productData.size_XL_price || 0,
          XXL: productData.size_XXL_price || 0,
        });

        setStocks({
          XS: productData.size_XS_stock || 0,
          S: productData.size_S_stock || 0,
          M: productData.size_M_stock || 0,
          L: productData.size_L_stock || 0,
          XL: productData.size_XL_stock || 0,
          XXL: productData.size_XXL_stock || 0,
        });

      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);

    const { id } = await params;

    // Add price and stock for each size
    for (let size of ["XS", "S", "M", "L", "XL", "XXL"]) {
      formData.append(`${size}_price`, prices[size]);
      formData.append(`${size}_stock`, stocks[size]);
    }

    try {
      const result = await editProduct(id, formData); // Edit product with form data

      // Display success message
      toast.success(result.message || "Product updated successfully!");
    } catch (error) {
      // Display error message
      toast.error("Error updating product. Please try again.");
    }
  };

  // Only render the form once the product data is available
  if (!product) {
    return <div>Loading...</div>; // Or you can render a spinner or any other loading state
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 shadow-2xl rounded-3xl">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Admin Dashboard - Edit Product</h1>

      {/* Form to edit a product */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Product Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-white">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter product name"
            defaultValue={product.name}
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
            defaultValue={product.description}
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
            defaultValue={product.price || 0} // Ensure fallback to 0
            required
            className="mt-2 p-4 block w-full border-2 border-teal-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Discount Percentage */}
        <div className="mb-6">
          <label htmlFor="discountPercentage" className="block text-sm font-medium text-white">Discount Percentage</label>
          <input
            type="number"
            name="discountPercentage"
            id="discountPercentage"
            placeholder="Enter discount percentage"
            defaultValue={product.discountPercentage || 0} // Ensure fallback to 0
            required
            className="mt-2 p-4 block w-full border-2 border-teal-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Product Images */}
        <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-medium text-white">Product Images</label>
          <input
            type="file"
            name="image"
            id="image"
            multiple
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
            defaultValue={product.category}
            required
            className="mt-2 p-4 block w-full border-2 border-teal-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Size-specific prices and stock */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size}>
              {/* Price input for each size */}
              <label htmlFor={`size_${size}_price`} className="block text-sm font-medium text-white">{`${size} Price`}</label>
              <input
                type="number"
                name={`size_${size}_price`}
                id={`size_${size}_price`}
                defaultValue={prices[size] || 0} // Ensure fallback to 0
                onChange={(e) => setPrices({ ...prices, [size]: parseFloat(e.target.value) || 0 })}
                placeholder={`Price for ${size}`}
                className="mt-2 p-4 block w-full border-2 border-teal-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              {/* Stock input for each size */}
              <label htmlFor={`size_${size}_stock`} className="block text-sm font-medium text-white">{`${size} Stock`}</label>
              <input
                type="number"
                name={`size_${size}_stock`}
                id={`size_${size}_stock`}
                defaultValue={stocks[size] || 0} // Ensure fallback to 0
                onChange={(e) => setStocks({ ...stocks, [size]: parseInt(e.target.value, 10) || 0 })}
                placeholder={`Stock for ${size}`}
                className="mt-2 p-4 block w-full border-2 border-teal-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mb-6">
          <button
            type="submit"
            className="w-full py-3 px-5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300"
          >
            Update Product
          </button>
        </div>
      </form>

      {/* Display Toast Notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}
