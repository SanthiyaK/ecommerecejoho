"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { UserLogout } from "@/app/action/loginAction";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import Image from "next/image"; // Import for next.js optimized images

export function Header() {
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [profilePicture, setProfilePicture] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // New state for category
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Checking for user authentication and profile details
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const profilePic = localStorage.getItem("profilePicture");
      const role = localStorage.getItem("userRole");
      if (profilePic) {
        setProfilePicture(profilePic);
      }
      if (role) {
        setUserRole(role);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Fetching cart item count
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const userCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      setCartItemCount(userCart.length);
    }
  }, []);

  // Handling search
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?query=${query}&category=${selectedCategory}`);
    }
  };

  // Handling category change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    // Update the URL with the selected category
    router.push(`/products?query=${query}&category=${category}`);
  };

  // Toggle dropdown visibility
  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Handle logout
  const logout = async () => {
    const result = await UserLogout();
    if (result.success) {
      setIsLoggedIn(false);
      setDropdownVisible(false);
      router.push("/login");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
      {/* Logo Section */}
      <div className="flex flex-col items-center sm:items-start space-y-2">
        <h2 className="text-xl font-bold text-white">Kids' Clothing</h2>
        <Image
          src="/kid_dresses/product9.webp"
          alt="Kids Clothing"
          width={70}
          height={70}
          className="rounded-lg object-cover shadow-lg"
          unoptimized
        />

      </div>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex flex-grow justify-center mt-4 sm:mt-0">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-80 sm:w-96 py-2 px-4 text-lg rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

              {/* Category Dropdown */}
        <div className="mt-4 sm:mt-0">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="py-3 px-5 text-lg font-medium rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 text-white focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out shadow-lg w-full"
          >
            <option value="" className="bg-white text-black">All Categories</option>
            <option value="kids Dresses" className="bg-white text-black">Kids Dresses</option>
            <option value="chudithars" className="bg-white text-black">Chudithars</option>
            <option value="accessories" className="bg-white text-black">Accessories</option>
            {/* Add other categories as needed */}
          </select>
        </div>

      {/* Header Items (Login/Signup/Profile/Cart) */}
      <div className="flex items-center space-x-4 sm:space-x-6 mt-4 sm:mt-0">
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Signup
            </button>
          </>
        ) : (
          <>
            {/* Links for Profile, Products, and Chudithar */}
            <div className="hidden sm:flex items-center space-x-6">
              <Link href="/profile">
                <button className="text-white text-sm hover:text-blue-400 transition-all duration-200 ease-in-out">
                  Profile
                </button>
              </Link>
              <Link href="/products">
                <button className="text-white text-sm hover:text-blue-400 transition-all duration-200 ease-in-out">
                  Products
                </button>
              </Link>
            
              <Link href="/contact">
                <button className="text-white text-sm hover:text-blue-400 transition-all duration-200 ease-in-out">
                  Contact
                </button>
              </Link>
              <Link href="/aboutus">
                <button className="text-white text-sm hover:text-blue-400 transition-all duration-200 ease-in-out">
                  About
                </button>
              </Link>
            </div>

            {/* Profile Picture and Dropdown */}
            <div className="relative">
              <img
                src={profilePicture || "/default-avatar.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                onClick={handleProfileClick}
              />
              {dropdownVisible && (
                 <div
                 ref={dropdownRef}
                 className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50 ring-1 ring-gray-200 dark:ring-gray-700"
               >
                 <div className="flex flex-col p-2">
                   {/* Profile Link */}
                   <Link href="/profile" passHref>
                     <button className="w-full px-4 py-2 text-left text-blue-600 hover:bg-gray-100 dark:text-blue-400 dark:hover:bg-gray-800 transition-colors duration-200 rounded-md">
                       Profile
                     </button>
                   </Link>
                   
                   {/* Products Link */}
                   <Link href="/products" passHref>
                     <button className="w-full px-4 py-2 text-left text-blue-600 hover:bg-gray-100 dark:text-blue-400 dark:hover:bg-gray-800 transition-colors duration-200 rounded-md">
                       Products
                     </button>
                   </Link>
                   
                   {/* Admin Link (only for admin users) */}
                   {userRole === "admin" && (
                     <Link href="/admin/dashboard" passHref>
                       <button className="w-full px-4 py-2 text-left text-blue-600 hover:bg-gray-100 dark:text-blue-400 dark:hover:bg-gray-800 transition-colors duration-200 rounded-md">
                         Admin Dashboard
                       </button>
                     </Link>
                   )}
                   
                   {/* Logout Button */}
                   <button
                     onClick={logout}
                     className="w-full px-4 py-2 text-left text-blue-600 hover:bg-gray-100 dark:text-blue-400 dark:hover:bg-gray-800 rounded-b-md transition-colors duration-200"
                   >
                     Logout
                   </button>
                 </div>
               </div>
              )}
            </div>

            {/* Cart Icon with count */}
            <div className="relative flex items-center">
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center -mt-1 -mr-1">
                  {cartItemCount}
                </span>
              )}
              <Link href="/cart" className="flex items-center">
                <ShoppingCartIcon className="w-8 h-8 text-white" />
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
