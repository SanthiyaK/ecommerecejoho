"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'; // Use this hook to get the query parameters

export default function ProductsList({ filteredProducts, page, totalPages, currentCategory }) {
  const router = useRouter(); // For updating URL
  const searchParams = useSearchParams(); // To get the URL parameters like 'query' and 'category'
  const [category, setCategory] = useState(currentCategory || ''); // Store selected category

  const query = searchParams.get('query') || ''; // Get 'query' from URL or default to empty string

  // Helper function to calculate discounted price
  const calculateDiscountedPrice = (price, discountPercentage) => {
    return (price * (1 - discountPercentage / 100)).toFixed(2);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    router.push(`/products?query=${query}&category=${selectedCategory}`);
  };

  return (
    <div className="flex flex-col sm:flex-row container mx-auto p-4">
      {/* Left Sidebar - Sky Blue Gradient Filter Panel with reduced width and margin-top adjustment */}
      <div className="bg-gradient-to-r from-sky-400 to-blue-600 text-white p-4 rounded-lg shadow-xl sm:w-1/5 mb-8 sm:mb-0 mt-6 sm:mt-0 max-h-[200px] overflow-y-auto flex justify-center items-start">
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-4">Category Filter</h3>

          {/* Radio Button for Category Selection */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="all"
                name="category"
                value=""
                checked={category === ''}
                onChange={handleCategoryChange}
                className="w-5 h-5 text-sky-500 focus:ring-sky-500"
              />
              <label htmlFor="all" className="text-sm">All Categories</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="kids-dresses"
                name="category"
                value="Kids Dresses"
                checked={category === 'Kids Dresses'}
                onChange={handleCategoryChange}
                className="w-5 h-5 text-sky-500 focus:ring-sky-500"
              />
              <label htmlFor="kids-dresses" className="text-sm">Kids Dresses</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="chudithars"
                name="category"
                value="Chudithars"
                checked={category === 'Chudithars'}
                onChange={handleCategoryChange}
                className="w-5 h-5 text-sky-500 focus:ring-sky-500"
              />
              <label htmlFor="chudithars" className="text-sm">Chudithars</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="accessories"
                name="category"
                value="Accessories"
                checked={category === 'Accessories'}
                onChange={handleCategoryChange}
                className="w-5 h-5 text-sky-500 focus:ring-sky-500"
              />
              <label htmlFor="accessories" className="text-sm">Accessories</label>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid Section */}
      <div className="sm:w-4/5">
        <h2 className="text-3xl font-semibold text-center text-blue-900 mb-8">Explore Our Amazing Products</h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              // Calculate discounted price
              const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);

              return (
                <div
                  key={product._id}
                  className="product-card relative p-6 border-2 border-gray-200 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 group bg-white"
                >
                  {/* Image Section */}
                  <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex justify-center items-center bg-gray-300 text-gray-600 rounded-lg">
                        No images available
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="product-info">
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-2">{product.category}</p>

                    {/* Display discounted price if available */}
                    <div className="flex flex-col">
                      <span className="text-green-700 font-bold text-lg">₹{discountedPrice}</span>
                      {product.discountPercentage > 0 && (
                        <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                      )}
                      {product.discountPercentage > 0 && (
                        <span className="text-sm text-red-500">{product.discountPercentage}% off</span>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link href={`/product/${product._id}`} passHref>
                    <button className="mt-4 w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200">
                      View Details
                    </button>
                  </Link>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-3">
            {/* Previous Button */}
            {page > 1 && (
              <Link
                href={`/products?query=${query}&category=${category}&page=${page - 1}`}
                passHref
              >
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  &lt; Prev
                </button>
              </Link>
            )}

            {/* Page Number Info */}
            <div className="flex items-center space-x-1">
              <span className="text-lg font-semibold text-gray-700">Page {page} of {totalPages}</span>
            </div>

            {/* Next Button */}
            {page < totalPages && (
              <Link
                href={`/products?query=${query}&category=${category}&page=${page + 1}`}
                passHref
              >
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Next &gt;
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
