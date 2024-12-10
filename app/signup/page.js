"use client";

import { useState } from "react";
import { UserRegister } from "../action/authaction";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify components
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

export default function UserForm() {
  const [message, setMessage] = useState();

  const handleSubmit = async (formData) => {
    const result = await UserRegister(formData); // Assuming UserRegister sends data and returns a result

    // Display the message with toast
    if (result.success) {
      toast.success(result.message); // Show success toast
    } else {
      toast.error(result.message); // Show error toast
    }

    // Optionally clear message after a few seconds
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        action={handleSubmit} // Use onSubmit to handle form submission
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative space-y-6"
      >
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Register Form</h1>

        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full p-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Name"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full p-3 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-violet-500 text-white py-3 rounded-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-200"
        >
          Register
        </button>

        {/* Optional Message Display (if needed) */}
        {message && (
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-full max-w-md">
            <p className="bg-white p-4 rounded-lg shadow-lg text-xl text-center text-gray-800">
              {message}
            </p>
          </div>
        )}
      </form>

      {/* ToastContainer for React Toastify */}
      <ToastContainer
        position="top-center"  // Position toast notifications at the top-center
        autoClose={5000}       // Auto-close the toast after 5 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={true}      // Newest toast appears on top
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // You can choose the theme you prefer, 'light' or 'dark'
      />
    </div>
  );
}
