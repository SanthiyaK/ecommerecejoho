"use server";

import dbconnect from "@/db/dbconnect";
import Order from "@/model/OrderModel";

// Fetch orders function (Server-side)
export async function getOrders() {
  try {
    await dbconnect(); // Ensure DB is connected

    const orders = await Order.find().lean(); // lean() ensures we get plain JavaScript objects

    // Serialize orders to ensure all ObjectIds are converted to strings
    const serializedOrders = orders.map((order) => {
      return {
        _id: order._id.toString(), // Convert MongoDB ObjectId to string
        totalPrice: order.totalPrice, // Ensure it's a primitive number
        itemsPrice: order.itemsPrice,
        shippingPrice: order.shippingPrice,
        taxPrice: order.taxPrice,
        user: order.user.toString(), // Convert user ObjectId to string
        items: order.items.map((item) => ({
          ...item,
          productId: item.productId.toString(), // Convert productId to string (ObjectId)
          _id: item._id.toString(), // Convert item _id to string
        })),
        shippingInfo: order.shippingInfo,
        createdAt: order.createdAt.toString(), // Convert Date to ISO string
        updatedAt: order.updatedAt.toString(), // Convert Date to ISO string
      };
    });

    return serializedOrders; // Return the serialized orders
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Unable to fetch orders");
  }
}
