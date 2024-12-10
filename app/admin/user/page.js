"use client";
import React, { useState, useEffect } from "react";
import { updateUserRole } from "@/app/action/AdminUserRole";
import { getUsers } from "@/app/action/FetchUsers"; // Function to fetch all users

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to show while fetching data

  // Fetch users using useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Once data is fetched, stop loading
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures the effect runs only once (component mounts)

  const handleRoleChange = async (userId) => {
    try {
      setLoading(true); // Set loading state while the role is being updated
      await updateUserRole(userId, 'admin');
      // After the role is updated, fetch users again to reflect the changes
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);
      alert('User role updated successfully');
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setLoading(false); // Stop loading after the role update is complete
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-lg rounded-lg max-w-full mx-auto">
      <h2 className="text-3xl font-semibold text-center text-white mb-6">Manage Users</h2>

      {/* Show loading message while fetching users */}
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-white">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white">Role</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className={`border-t ${user.role === "admin" ? "bg-gray-100" : "bg-gray-50"}`}>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.role}</td>
                  <td className="px-6 py-4">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleRoleChange(user._id)}
                        disabled={loading}
                        className={`bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gradient-to-l hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Promote to Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
