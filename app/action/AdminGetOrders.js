"use server"
import dbconnect from "@/db/dbconnect";
import Order from "@/model/OrderModel";

// Fetch orders function (Server-side)
export async function getOrders() {
  try {
    await dbconnect();  // Ensure DB is connected

    const orders = await Order.find().lean(); // lean() ensures we get plain JavaScript objects

    // Serialize the orders
    const serializedOrders = orders.map((order) => {
      return {
        _id: order._id.toString(), // Convert MongoDB ObjectId to string
        totalPrice: order.totalPrice, // Ensure it's a primitive number
        itemsPrice: order.itemsPrice,
        shippingPrice: order.shippingPrice,
        taxPrice: order.taxPrice,
        user: order.user,
        items: order.items,
        shippingInfo: order.shippingInfo,
        createdAt: order.createdAt.toString(), // Convert Date to string
        updatedAt: order.updatedAt.toString(), // Convert Date to string
      };
    });

    return serializedOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Unable to fetch orders');
  }
}