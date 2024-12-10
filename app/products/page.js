 "use client"
import { SearchBar } from "../action/SearchAction";
import ProductsList from "./ProductsList"; // Ensure this path is correct

export default async function ProductsPage({ searchParams }) {
  // Extract the query and category from the URL search params
  const query = searchParams.query || ''; // Default to empty string if query is not provided
  const category = searchParams.category || ''; // Default to empty string if category is not provided
  const page = parseInt(searchParams.page) || 1; // Default to page 1 if no page is provided
  const limit = 10; // Define the number of products per page

  console.log('Search Query:', query);
  console.log('Category:', category);

  // Call the server action to filter products based on the query, category, and pagination
  const { products, totalProducts } = await SearchBar(query, category, page, limit);
  console.log('Filtered Products:', products);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div>
      {/* Pass filtered products and pagination info to the ProductsList component */}
      <ProductsList filteredProducts={products} page={page} totalPages={totalPages} category={category} />
    </div>
  );
}
