"use client";

import { useRouter } from 'next/navigation';
import { UserLogin } from '../action/loginAction';
import { ToastContainer, toast } from 'react-toastify';  // Import Toastify components
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    // Call the UserLogin action with the form data
    const result = await UserLogin(formData);

    if (result.success) {
      // Successful login, show success toast
      toast.success(result.message);  // Show success message
      console.log(result.token);
      localStorage.setItem('token', result.token);
      localStorage.setItem('userId', result.user);
      localStorage.setItem('userRole', result.role);  // Store role in localStorage

      // Redirect to products page
      router.push("/products");
    } else {
      // Show error toast if login fails
      toast.error(result.message);  // Show error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <form
        action={handleSubmit}  // Update to use onSubmit
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-6"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-800">Login Form</h1>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            className="w-full p-4 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            className="w-full p-4 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter your password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        >
          Login
        </button>

        {/* Forgot Password Link */}
        <div className="text-center text-gray-600">
          <Link href="/forgot-password" className="text-sm hover:text-indigo-500">Forgot your password?</Link>
        </div>

        {/* Register Link */}
        <div className="text-center text-gray-600">
          <p className="text-sm">Don't have an account? 
            <Link href="/signup" className="text-indigo-600 hover:text-indigo-700"> Sign up</Link>
          </p>
        </div>
      </form>

      {/* ToastContainer for rendering the toasts */}
      <ToastContainer
        position="top-right"  // You can change this based on where you want the toast to appear
        autoClose={5000}      // Toast will auto-close after 5 seconds
        hideProgressBar={false} // Display a progress bar
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
