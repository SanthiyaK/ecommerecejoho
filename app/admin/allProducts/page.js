import { fetchProducts } from "../../action/Productsaction"; // Import the function to fetch products
import ProductList from "./ProductList"; // Import the ProductList component

export default async function AdminProductsPage() {
  const products = await fetchProducts(); // Fetch the list of products

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6">Admin Products</h1>
      <ProductList products={products} /> {/* Pass products to ProductList component */}
    </div>
  );
}
