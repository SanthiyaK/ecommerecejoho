import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Manage Users */}
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Manage Users</h3>
            <p className="text-gray-600 mb-4">Easily manage your users and promote them to admins.</p>
            <Link href="/admin/user">
              <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
                Go to Users Management
              </button>
            </Link>
          </div>

          {/* Manage Orders */}
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-green-600">Manage Orders</h3>
            <p className="text-gray-600 mb-4">Manage and track orders easily with a few clicks.</p>
            <Link href="/admin/orders">
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                Go to Orders Management
              </button>
            </Link>
          </div>

          {/* View All Orders */}
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-600">All Orders</h3>
            <p className="text-gray-600 mb-4">View and manage all orders in one place.</p>
            <Link href="/admin/allorder">
              <button className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition duration-300">
                View All Orders
              </button>
            </Link>
          </div>

          {/* Manage Products */}
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-teal-600">Manage Products</h3>
            <p className="text-gray-600 mb-4">Control your product listings and details.</p>
            <Link href="/admin/products">
              <button className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300">
                Go to Products Management
              </button>
            </Link>
          </div>

          {/* Total Items */}
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-orange-600">Total Items</h3>
            <p className="text-gray-600 mb-4">View the total number of items across all products.</p>
            <Link href="/admin/total">
              <button className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-300">
                View Total Items
              </button>
            </Link>
          </div>

          {/* All Products */}
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-purple-600">All Products</h3>
            <p className="text-gray-600 mb-4">View and manage all products in one place.</p>
            <Link href="/admin/allProducts">
              <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300">
                View All Products
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
