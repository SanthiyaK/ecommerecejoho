import dbconnect from "@/db/dbconnect"; // Ensure DB connection
import Product from "@/model/ProductModel"; // Import Product model

// Server function to fetch products with pagination, search query, category filter, and sorting
export async function SearchBar(query = "", category = "", page = 1, limit = 10, sortBy = 'createdAt', sortOrder = -1) {
  try {
    await dbconnect(); // Ensure DB is connected

    // Initialize the filter object
    const filter = {};

    // If a query is provided, perform a case-insensitive search on the name and description fields
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive match for name
        { description: { $regex: query, $options: 'i' } }, // Case-insensitive match for description
      ];
    }

    // If a category is provided, add it to the filter criteria
    if (category) {
      filter.category = { $regex: category, $options: 'i' }; // Case-insensitive match for category
    }

    // Apply sorting: 'sortBy' will be the field and 'sortOrder' will determine ascending (-1) or descending (1)
    const sort = {};
    sort[sortBy] = sortOrder;

    // Perform the query to fetch products based on the filter
    const productsQuery = Product.find(filter).sort(sort); // Apply sorting

    // Apply pagination
    const products = await productsQuery
      .skip((page - 1) * limit) // Skip the items based on the current page
      .limit(limit); // Limit the number of items per page

    // Get the total count of products for pagination
    const totalProducts = await Product.countDocuments(filter);

    // Return both products and the total count for pagination
    return {
      products: products.map((product) => {
        // Ensure product.image is an array, if not, make it one
        const images = Array.isArray(product.image) ? product.image : [product.image];
        
        // Grab the first image if available, otherwise set to null or a fallback
        const firstImage = images.length > 0 ? images[0].toString() : null;

        return {
          _id: product._id.toString(),  // Convert MongoDB ObjectId to string
          name: product.name,
          description: product.description,
          price: product.price,
          discountPercentage: product.discountPercentage,
          image: firstImage,  // Use the first image if it's available, or null if not
          category: product.category,
          stock: product.stock,
        };
      }),
      totalProducts, // Include the total count for pagination
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error('Unable to fetch products');
  }
}
