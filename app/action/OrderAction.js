"use server"
import dbconnect from "@/db/dbconnect"; // MongoDB connection utility
import Order from "@/model/OrderModel";  // Order model
import Product from "@/model/ProductModel"; // Product model

// Server action to handle order creation and stock update
export async function createOrder(totalPrice, itemsPrice, shippingPrice, taxPrice, cartItems, userId, shippingInfo) {
  try {
    // Connect to MongoDB
    await dbconnect();

    // Validate the sizes before processing the cart
    const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];  // Define the valid sizes

    // Format cart items into an array of OrderItem objects and validate sizes
    const formattedItems = cartItems.map(item => {
      // Ensure size is valid
      if (!validSizes.includes(item.selectedSize)) {
        throw new Error(`Invalid size selected: ${item.selectedSize}`);
      }

      return {
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.selectedSize,  // Store selected size for stock management
      };
    });

    // Create the order in the database
    const newOrder = new Order({
      totalPrice,
      itemsPrice,
      shippingPrice,
      taxPrice,
      items: formattedItems,
      user: userId,
      shippingInfo,
    });

    // Save the order to MongoDB
    const createdOrder = await newOrder.save();

    // Now, update the stock of each product based on the selected size and quantity
    for (const item of formattedItems) {
      const product = await Product.findById(item.productId); // Fetch the product from DB

      if (product) {
        // Check the stock for the selected size and decrease it
        const sizeStock = product.sizes[item.size]?.stock || 0;  // Get the stock for the selected size

        if (sizeStock < item.quantity) {
          throw new Error(`Insufficient stock for size: ${item.size}. Available stock: ${sizeStock}`);
        }

        // Decrease the stock for the selected size
        product.sizes[item.size].stock -= item.quantity;

        // If stock goes negative, throw an error
        if (product.sizes[item.size].stock < 0) {
          throw new Error(`Insufficient stock for size: ${item.size}`);
        }

        // Save the updated product stock
        await product.save();
      } else {
        throw new Error(`Product not found: ${item.productId}`);
      }
    }

    // Convert Mongoose object to plain object (removes Mongoose-specific methods)
    const plainOrder = createdOrder.toString();

    // Return the plain order object to the client
    return plainOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('There was an error creating the order. Please try again later.');
  }
}
