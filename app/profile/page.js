'use client';

import { useState, useEffect } from 'react';
import { uploadProfilePicture, getUserDetails } from '../action/ProfileAction'; // Import server-side functions

export default function Profile() {
  const [profilePicture, setProfilePicture] = useState(null); // Local state for profile picture
  const [userDetails, setUserDetails] = useState({ name: '', email: '', profilePicture: '' }); // Local state for user details

  // Function to fetch user details and profile picture
  const fetchUserDetails = async (userId) => {
    try {
      const data = await getUserDetails(userId); // Assuming this fetches user details from the server
      setUserDetails(data); // Update user details state
      if (data.profilePicture) {
        setProfilePicture(data.profilePicture); // If profile picture exists, set it
        localStorage.setItem('profilePicture', data.profilePicture); // Store URL in localStorage
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Effect hook to fetch user data on mount
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchUserDetails(userId); // Fetch user details if userId exists
    } else {
      console.error('No userId found in localStorage');
    }
  }, []); // Empty dependency array ensures this only runs once on mount

  // Fetch profile picture from localStorage on mount (if available)
  useEffect(() => {
    const storedProfilePicture = localStorage.getItem('profilePicture');
    if (storedProfilePicture) {
      setProfilePicture(storedProfilePicture); // Set profile picture from localStorage
    }
  }, []); // Runs once on mount

  // Function to handle profile picture change
  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePicture', file); // Append file to FormData

      try {
        const uploadedFileUrl = await uploadProfilePicture(formData); // Upload the file
        setProfilePicture(uploadedFileUrl); // Set new profile picture state
        localStorage.setItem('profilePicture', uploadedFileUrl); // Store the updated URL in localStorage
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">User Profile</h1>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-4 sm:mb-0 sm:w-1/4">
          <div className="w-32 h-32 mb-4">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile Picture"
                className="w-full h-full object-cover rounded-full border-4 border-blue-500"
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center bg-gray-300 rounded-full">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
          />
        </div>

        {/* User Details Section */}
        <div className="sm:w-3/4 sm:ml-6">
          <div className="text-lg font-medium text-gray-700 mb-2">
            <strong>Name:</strong> {userDetails.name || 'Loading...'}
          </div>
          <div className="text-lg font-medium text-gray-700 mb-4">
            <strong>Email:</strong> {userDetails.email || 'Loading...'}
          </div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="text-center mt-6">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          onClick={() => alert('Edit profile feature coming soon!')}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
