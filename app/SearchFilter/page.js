"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router for URL manipulation
import { SearchBar } from '../action/SearchAction';
 // Import SearchBar action

export default function ProductsPage({ searchParams }) {
  const router = useRouter(); // Get router for URL manipulation
  const query = searchParams.query || ''; // Default to empty string if query is not provided
  const categoryFromUrl = searchParams.category || ''; // Read category from URL
  const [category, setCategory] = useState(categoryFromUrl); // State for category filter
  const [page, setPage] = useState(1); // Current page state
  const [productsData, setProductsData] = useState({ products: [], totalProducts: 0 });

  

  // Function to fetch data when query, category, or page changes
  useEffect(() => {
    const fetchData = async () => {
      const { products, totalProducts } = await SearchBar(query, category, page, 10); // Pass category to SearchBar
      setProductsData({ products, totalProducts });
    };
    
    fetchData();
  }, [query, category, page]); // Re-fetch when query, category, or page changes

  const totalPages = Math.ceil(productsData.totalProducts / 10); // Calculate total pages

  return (
    <div>
     
      {/* Display filtered products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {productsData.products.length > 0 ? (
          productsData.products.map((product) => (
            <div key={product._id} className="product-card p-4 border rounded">
              {/* Show only the first image from the images array */}
              <div className="product-images">
                {product.image ? (
                  <img
                    src={product.image} // Display the first image
                    alt={product.name}
                    className="w-full h-auto object-cover mb-2"
                    width={200}
                    height={300}
                  />
                ) : (
                  <p>No images available</p> // Fallback if no images are available
                )}
              </div>

              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <span className="text-green-700 font-bold text-lg">₹{product.price}</span>
            </div>
          ))
        ) : (
          <p>No products found matching your search.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
            className="px-4 py-2 border rounded-md mx-2"
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">{page} / {totalPages}</span>
          <button
            onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages))}
            className="px-4 py-2 border rounded-md mx-2"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
