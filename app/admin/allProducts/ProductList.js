"use client";

import { deleteProduct } from "@/app/action/AdminDeleteProduct";
import { useRouter } from "next/navigation"; // Import the delete product function
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

export default function ProductList({ products }) {
  const router = useRouter();

  const handleDelete = async (productId) => {
    const result = await deleteProduct(productId); // Call the server action

    if (result.success) {
      // Show a success toast
      toast.success(result.message); 
      // Optionally, refresh the product list or navigate away after deletion
      // router.reload(); // You can reload or re-fetch products if needed
    } else {
      // Show an error toast
      toast.error(result.message); 
    }
  };

  const handleEdit = (productId) => {
    router.push(`/admin/edit-product/${productId}`); // Redirect to the edit page
  };

  return (
    <div className="overflow-x-auto px-4 py-6">
      <table className="min-w-full table-auto bg-white border-collapse shadow-lg rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Stock</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t hover:bg-gray-50 transition duration-300">
              <td className="px-4 py-3 text-sm text-gray-700">{product.name}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{product.description}</td>
              <td className="px-4 py-3 text-sm text-gray-700">${product.price}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{product.category}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{product.stock}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(product._id)} // Redirect to edit page
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Toast Container for displaying toasts */}
      <ToastContainer
        position="top-right" // Toast position
        autoClose={5000} // Toast auto-close time (in ms)
        hideProgressBar={false} // Show the progress bar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
