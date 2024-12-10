"use client"; // Ensure this runs only on the client

import { CartContext } from '@/context/CartContext';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function ProductDetail({ product, relatedProducts }) {
  const { addToCart} = useContext(CartContext);
  const [userId, setUserId] = useState(null); // State for storing userId
  const [selectedImage, setSelectedImage] = useState(product.image ? product.image[0] : product.image); // Set first image as the selected image initially
  const [selectedSize, setSelectedSize] = useState("M"); // Default size (can be customized)
  const [quantity, setQuantity] = useState(1); // Quantity state with a default value of 1

  const { price, discountPercentage, sizes } = product;

  // Calculate Discounted Price
  const getPriceForSize = (size) => {
    // Check if size exists in the `sizes` object and return the respective price.
    return sizes[size]?.price || price; // Fallback to base price if no specific price is set for this size
  };

  const discountedPrice = (getPriceForSize(selectedSize) * (1 - discountPercentage / 100)).toFixed(2);

  // Calculate Discount Percentage Text
  const discountText = `${discountPercentage}% off`;

  useEffect(() => {
    // Get userId from localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.log("No user ID found. Please log in.");
    }
  }, []);

  // Check if product with selected size is in the cart without using `some()`
  const isProductInCart = () => {
    if (userId) {
      const userCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      // Iterate over the cart to check if the product with selected size exists
      for (let item of userCart) {
        if (item._id === product._id && item.selectedSize === selectedSize) {
          return true; // Product with selected size found in the cart
        }
      }
    }
    return false; // Product not found
  };

  // Add product to cart and show success toast
  const handleAddToCart = async () => {
    if (sizes[selectedSize]?.stock === 0) {
      toast.error('Sorry, this size is out of stock!');
      return;
    }
    if (userId) {
      await addToCart(product, selectedSize); // Pass size along with product
      toast.success('Product added to your cart!');
    } else {
      toast.error('Please log in to add to the cart.');
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); // Update the main image when a thumbnail is clicked
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size); // Change selected size
    setQuantity(1); // Reset quantity to 1 whenever size changes
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-pink-200 via-yellow-200 to-blue-300 p-8 rounded-lg shadow-lg space-y-6 md:space-y-0">
        
        {/* Left Panel: Product Images */}
        <div className="flex-1 flex flex-col items-center md:w-1/2 mb-6 md:mb-0 space-y-4">
          {/* Main Image */}
          <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-xl mb-4 group hover:scale-105 transition-all duration-300">
            <Image
              src={selectedImage}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg object-cover group-hover:scale-105 transition-all duration-300"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-auto mb-4">
            {product.image && product.image.length > 0 ? (
              product.image.map((image, index) => (
                <div key={index} className="cursor-pointer relative group">
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover transition-transform transform group-hover:scale-110 duration-200"
                    onClick={() => handleImageClick(image)} // Update selected image on click
                  />
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>

        {/* Right Panel: Product Info */}
        <div className="flex-1 md:w-1/2 p-8 bg-white rounded-lg shadow-lg space-y-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Discounted Price and MRP */}
          <div className="flex flex-col space-y-2 mb-6">
            <p className="text-2xl font-bold text-gray-900">₹{discountedPrice}</p>
            <p className="text-sm text-gray-500 line-through">M.R.P.: ₹{getPriceForSize(selectedSize)}</p>
            <p className="text-sm text-red-500">{discountText}</p>
          </div>

          {/* Stock Availability */}
          <p className="text-sm text-green-600 mb-4">{sizes[selectedSize]?.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>

          {/* Size Selector */}
          <div className="flex items-center space-x-4 mb-6">
            <label className="text-sm text-gray-600">Size: </label>
            <select 
              value={selectedSize} 
              onChange={(e) => handleSizeChange(e.target.value)} 
              className="p-2 border border-gray-300 rounded-lg">
              {Object.keys(sizes).map((size) => (
                <option key={size} value={size} disabled={sizes[size]?.stock === 0}>
                  {size} ({sizes[size]?.stock} available)
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-sky-600 text-white py-3 rounded-lg text-lg hover:bg-sky-700 transition-colors duration-300"
            disabled={isProductInCart() || sizes[selectedSize]?.stock === 0}
          >
            {isProductInCart() ? 'Already In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct._id} className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Link href={`/product/${relatedProduct._id}`}>
                  <div className="relative w-full h-64 mb-4">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                  <span className="text-green-700 font-bold text-lg">₹{relatedProduct.price}</span>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No related products available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
