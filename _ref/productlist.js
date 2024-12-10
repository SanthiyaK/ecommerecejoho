// app/products/ProductsList.js
"use client";

import Image from 'next/image';
import Link from 'next/link';

export function ProductsList({ products }) {
  const productArray = products.map((product) => (
    <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-64 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"   // Ensures the image fills the container
          objectFit="cover" // Keeps aspect ratio and covers the area
          priority={true} 
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.category}</p>
      <span className="text-green-700 font-bold text-lg">${product.price}</span> <br/>
      {/* Button for viewing product details */}
      <Link href={`/product/${product._id}`} className="product-details-button">
        <button className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors duration-200">
          View Details
        </button>
      </Link>
    </div>
  ));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productArray}
    </div>
  );
}
import dbconnect from "@/db/dbconnect";
import CartModel from "@/model/cartModel";  // Import Cart model


export async function getCartItems() {
  try {
    await dbconnect()
    const cartItems = await CartModel.find().populate('product', 'name image price')  // Populate product fields: name, image, price
    .lean()  
    .exec();
   
      const cartItemsWithStringIds = cartItems.map(cartItem => ({
        ...cartItem,
        _id: cartItem._id.toString(),  // Convert _id to string
      }));
  
      console.log(cartItemsWithStringIds);  // Output the modified cart items
      return cartItemsWithStringIds;
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
}
 "use client"; // Ensure this runs only on the client

import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '@/context/CartContext'; // Ensure path is correct

const CheckoutForm = () => {
  const { cart, shippingInfo, setShippingDetails } = useContext(CartContext);

  // Initialize form fields with shippingInfo from context or fallback to empty string
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Load shipping data from localStorage when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedShippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
      if (savedShippingInfo) {
        setName(savedShippingInfo.name || '');
        setAddress(savedShippingInfo.address || '');
        setCity(savedShippingInfo.city || '');
        setPostalCode(savedShippingInfo.postalCode || '');
        setCountry(savedShippingInfo.country || '');
      }
    }
  }, []); // This effect runs only once when the component mounts

  // Whenever shippingInfo changes, update localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'shippingInfo',
        JSON.stringify({ name, address, city, postalCode, country })
      );
    }
  }, [name, address, city, postalCode, country]); // Runs when any of these state variables change

  // Handle form input change using FormData
  const handleShippingChange = (e) => {
    const formData = new FormData(e.target.form); // Get form data from the parent form element

    // Convert FormData to an object for easier manipulation
    const formValues = Object.fromEntries(formData.entries());

    // Update local state with FormData values
    setName(formValues.name || '');
    setAddress(formValues.address || '');
    setCity(formValues.city || '');
    setPostalCode(formValues.postalCode || '');
    setCountry(formValues.country || '');

    // Update CartContext's shippingInfo to keep it in sync
    setShippingDetails(formValues);
  };

  // Handle form submission with FormData
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Create FormData from the form inputs
      const formData = new FormData(e.target); // Use the event target to access the form

      // Convert FormData to an object for easier manipulation (optional)
      const formValues = Object.fromEntries(formData.entries());

      // Log FormData (optional for debugging)
      console.log('Form Data:', formValues);

      // Optionally, send the form data to the server (e.g., via fetch or axios)
      // Here, we're simulating a successful submission
      setSuccess('Shipping info saved successfully!');

      // Optionally, update the CartContext if needed
      setShippingDetails(formValues);

    } catch (error) {
      setError('An error occurred while saving shipping info.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-form">
      <h2>Shipping Information</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleShippingChange}
            required
          />
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleShippingChange}
            required
          />
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={handleShippingChange}
            required
          />
        </div>

        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={postalCode}
            onChange={handleShippingChange}
            required
          />
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            value={country}
            onChange={handleShippingChange}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Shipping Info'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
