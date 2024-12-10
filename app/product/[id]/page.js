// app/product/[id]/page.js


import fetchProduct from '@/app/action/Productaction';
import ProductList from './ProductList';
import { fetchProducts } from '@/app/action/Productsaction';



export default async function ProductPage({ params }) {
  const { id } = await params; // Extract the product ID from the dynamic route

  try {
    const product = await fetchProduct(id);  // Fetch product by ID
    const relatedProducts = await fetchProducts();
    if (!product) {
      return <div>Product not found</div>;  // Handle case where product is not found
    }

    return (
       <ProductList product={product} relatedProducts={relatedProducts}/> 
    );
  } catch (error) {
    return <div>Error fetching product details: {error.message}</div>;
  }
}
