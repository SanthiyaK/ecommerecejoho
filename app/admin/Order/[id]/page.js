import { getOrderWithDetails } from "@/app/action/FetchOrder";

export default async function OrderDetails({ orderId }) {
  let order = null;

  try {
    order = await getOrderWithDetails(orderId); // Fetch the order with details
  } catch (error) {
    console.error(error);
    order = null; // If error occurs, set order to null
  }

  if (!order) {
    // Show an alert or a message if order is not found
    return (
      <div className="p-8 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-xl rounded-lg">
        <h2 className="text-4xl font-bold text-center mb-8">Order Not Found</h2>
        <p className="text-xl text-center">
          Sorry, we couldn&apos;t find the order with ID: {orderId}. Please try again or contact support.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-r from-green-400 via-teal-500 to-cyan-600 text-white shadow-xl rounded-lg">
      <h2 className="text-4xl font-bold text-center mb-8">Order Details</h2>

      {/* Displaying Order Details */}
      <div className="p-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white text-gray-800">
        <div className="mb-4">
          <p className="font-semibold text-xl text-indigo-600">Order ID: <span className="text-gray-700">{order._id}</span></p>
          <p className="font-semibold text-xl text-green-500">Total Price: <span className="text-gray-700">${order.totalPrice}</span></p>
        </div>

        {/* Shipping Information */}
        <div className="mb-6">
          <p className="font-semibold text-lg text-gray-800">Shipping Information</p>
          <div className="mt-3 space-y-3">
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-600 w-32">Name:</span>
              <span>{order.shippingInfo.fullName}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-600 w-32">Address:</span>
              <span>{order.shippingInfo.address}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-600 w-32">City:</span>
              <span>{order.shippingInfo.city}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-600 w-32">Postal Code:</span>
              <span>{order.shippingInfo.postalCode}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-600 w-32">Phone Number:</span>
              <span>{order.shippingInfo.phoneNumber}</span>
            </div>
            {/* Displaying the Country */}
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-600 w-32">Country:</span>
              <span>{order.shippingInfo.country}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

