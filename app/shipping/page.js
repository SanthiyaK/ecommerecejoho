"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ShippingForm() {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phoneNumber: ''
  });

  const router = useRouter();

  // Retrieve userId from localStorage (assuming the user is logged in)
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    // Redirect to login page if no userId exists
    if (!userId) {
      router.push("/login");
      return;
    }

    // Pre-fill the form with existing shipping info if available
    const storedShippingInfo = localStorage.getItem(`shippingInfo_${userId}`);
    if (storedShippingInfo) {
      setShippingInfo(JSON.parse(storedShippingInfo));
    }
  }, [userId, router]);

  // Validate the shipping information form
  const validateForm = () => {
    // Simple validation to check if all fields are filled
    return Object.values(shippingInfo).every((value) => value.trim() !== '');
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form before proceeding
    if (!validateForm()) {
      alert('Please fill in all fields!');
      return;
    }

    // Save the shipping info in localStorage for the specific user
    localStorage.setItem(`shippingInfo_${userId}`, JSON.stringify(shippingInfo));

    // Reset the form fields by clearing the state
    setShippingInfo({
      fullName: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      phoneNumber: ''
    });

    // Redirect to the order confirmation page
    router.push('/order-confirm');
  };

  // Handle form field change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Enter Shipping Information</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="flex justify-between space-x-4">
            <div className="w-full">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={shippingInfo.fullName || ''} // Guard against undefined
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gradient-to-r from-teal-400 to-blue-500 text-white"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="flex justify-between space-x-4">
            <div className="w-full">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingInfo.address || ''} // Guard against undefined
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gradient-to-r from-teal-400 to-blue-500 text-white"
                required
              />
            </div>
          </div>

          {/* City */}
          <div className="flex justify-between space-x-4">
            <div className="w-full">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingInfo.city || ''} // Guard against undefined
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gradient-to-r from-teal-400 to-blue-500 text-white"
                required
              />
            </div>
          </div>

          {/* Country */}
          <div className="flex justify-between space-x-4">
            <div className="w-full">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={shippingInfo.country || ''} // Guard against undefined
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gradient-to-r from-teal-400 to-blue-500 text-white"
                required
              />
            </div>
          </div>

          {/* Postal Code */}
          <div className="flex justify-between space-x-4">
            <div className="w-full">
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={shippingInfo.postalCode || ''} // Guard against undefined
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gradient-to-r from-teal-400 to-blue-500 text-white"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex justify-between space-x-4">
            <div className="w-full">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={shippingInfo.phoneNumber || ''} // Guard against undefined
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gradient-to-r from-teal-400 to-blue-500 text-white"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:bg-gradient-to-l hover:from-teal-500 hover:to-green-500 transition-all duration-200"
          >
            Save and Continue
          </button>
        </form>
      </div>
    </div>
  );
}
