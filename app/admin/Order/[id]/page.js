"use client";

import { useState } from "react";
import { deleteOrderById } from '@/app/action/DeleteOrderedItem'; // Import the server action
import { toast } from "react-toastify"; // Import Toastify functions
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

export default function OrderDeleteButton({ params }) {
  const [loading, setLoading] = useState(false); // State for loading
  const [showConfirmation, setShowConfirmation] = useState(false); // Show confirmation modal

  const handleDelete = async () => {
    const { id } = await params; // Get the order ID from params

    setLoading(true); // Set loading state before making the delete request

    try {
      const result = await deleteOrderById(id); // Call the server-side action to delete the order

      if (result.success) {
        toast.success(result.message); // Show success message with Toastify
      } else {
        toast.error(result.message); // Show error message with Toastify
      }
    } catch (error) {
      toast.error("There was an error deleting the order."); // Show error message if exception occurs
    } finally {
      setLoading(false); // Set loading state to false after the request
      setShowConfirmation(false); // Close the confirmation modal
    }
  };

  return (
    <div className="flex justify-center flex-col items-center space-y-6">
      {/* Header or Content Area */}
      <h2 className="text-xl font-semibold text-gray-700">Are you sure you want to delete this order?</h2>

      {/* Delete Button */}
      <button
        onClick={() => setShowConfirmation(true)} // Show confirmation modal when clicked
        className="w-full sm:w-auto py-3 px-6 text-white rounded-xl bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-500 transition-all duration-300 transform hover:scale-105 focus:outline-none shadow-lg disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Order"}
      </button>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-center mb-4">Are you sure?</h2>
            <p className="text-gray-700 text-center mb-6">
              Once you delete this order, it cannot be undone.
            </p>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                disabled={loading}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
