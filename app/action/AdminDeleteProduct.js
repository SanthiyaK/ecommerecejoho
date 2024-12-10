// app/action/DeleteProduct.js
"use server";

import dbconnect from "@/db/dbconnect";  // Ensure you're connecting to the database
import Product from "@/model/ProductModel"; // Import the Product model

export async function deleteProduct(productId) {
  try {
    await dbconnect(); // Ensure DB connection is established

    // Find and delete the product by its ID
    const result = await Product.deleteOne({ _id: productId });

    if (result.deletedCount === 1) {
      return { success: true, message: "Product deleted successfully!" };
    } else {
      return { success: false, message: "Product not found!" };
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: "Failed to delete product." };
  }
}
