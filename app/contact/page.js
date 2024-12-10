"use client";
import { useState } from "react";
import { sendEmail } from "../action/ContactAction";
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

export default function ContactForm() {
  const [message, setMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const result = await sendEmail(formData);

    // Display success or error message using Toastify
    if (result.success) {
      toast.success(result.message); // Show success toast
    } else {
      toast.error(result.message); // Show error toast
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Left Panel: Contact Details */}
      <div className="flex-1 md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h1>
        <p className="text-lg text-gray-600">We'd love to hear from you!</p>
        <p className="text-lg text-gray-600 mt-2">Feel free to reach out with any questions or feedback.</p>

        <div className="mt-6">
          <p className="text-gray-700">📍 Address: 123 Kids Clothing Street, Fashion City, FC 12345</p>
          <p className="text-gray-700 mt-2">📧 Email: <a href="mailto:info@kidsclothing.com" className="text-blue-500 hover:underline">info@kidsclothing.com</a></p>
          <p className="text-gray-700 mt-2">☎️ Phone: <a href="tel:+1234567890" className="text-blue-500 hover:underline">+123 456 7890</a></p>
        </div>
      </div>

      {/* Right Panel: Contact Form */}
      <div className="flex-1 md:w-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Contact Us</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Name</label>
            <input
              className="w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
              type="text"
              name="name"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Email</label>
            <input
              className="w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
              type="email"
              name="email"
              required
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Message</label>
            <textarea
              className="w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
              name="message"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-violet-500 text-white p-2 rounded-lg hover:bg-violet-600 transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Toastify Container */}
      <ToastContainer
        position="top-right" // Position of the toast
        autoClose={5000} // Time in ms for toast to disappear
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // Toasts will appear on top
        closeOnClick // Close on click
        rtl={false} // Direction of toast (right-to-left)
        pauseOnFocusLoss
        draggable // Make toast draggable
        pauseOnHover // Pause the toast on hover
      />
    </div>
  );
}
