import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  size: {
    type: String,
    required: true,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']  // Include XS and XXL
  }
});


// Define the Order schema which includes an array of items (OrderItemSchema)
const orderSchema = new mongoose.Schema(
  { 
    totalPrice: {
      type: Number,
      required: true
    },
    itemsPrice: {
      type: Number,
      required: true
    },
    shippingPrice: {
      type: Number,
      required: true
    },
    taxPrice: {
      type: Number,
      required: true
    },
    items: {
      type: [OrderItemSchema],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,  // Reference to User model
      ref: "UserModels",  // Assuming you have a User model
      required: true
    },
    shippingInfo: {  // New field to store shipping details
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      country: { type: String, required: true }  // New country field
    }
  },
  {
    timestamps: true,  // Automatically includes createdAt and updatedAt fields
  }
);

// Ensure the model is cached (important for serverless environments like Next.js)
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
