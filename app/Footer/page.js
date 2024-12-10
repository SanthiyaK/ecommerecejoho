"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Top: Links & Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-blue-500 transition-colors">Shop</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-blue-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-blue-500 transition-colors">Shipping Info</Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-blue-500 transition-colors">Returns</Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-blue-500 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-blue-500 transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <i className="fab fa-facebook-f text-2xl"></i>
              </Link>
              <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <i className="fab fa-instagram text-2xl"></i>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <i className="fab fa-twitter text-2xl"></i>
              </Link>
              <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <i className="fab fa-linkedin text-2xl"></i>
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Contact Info</h3>
            <ul>
              <li className="text-gray-400">
                <p>123 Street Name</p>
                <p>City, Country</p>
              </li>
              <li className="text-gray-400 mt-2">
                <Link href="tel:+1234567890" className="hover:text-blue-500 transition-colors">+1 234 567 890</Link>
              </li>
              <li className="text-gray-400 mt-2">
                <Link href="mailto:info@example.com" className="hover:text-blue-500 transition-colors">info@example.com</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom: Copyright and Legal */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>© 2024 Kids Clothing Store. All rights reserved.</p>
          <div className="mt-2">
            <Link href="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link> | 
            <Link href="/terms" className="hover:text-blue-500 transition-colors"> Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
