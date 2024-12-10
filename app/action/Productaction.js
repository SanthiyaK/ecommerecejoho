"use server";

import dbconnect from "@/db/dbconnect";
import Product from "@/model/ProductModel";

export default async function fetchProduct(id) {
  try {
    await dbconnect(); // Ensure DB is connected

    // Fetch the product by ID
    const product = await Product.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    // Check if the image field is an array or a single image, and handle it accordingly
    const images = product.image && Array.isArray(product.image) 
      ? product.image.map(img => img.toString()) // Convert each image to string (assuming images are in Buffer format)
      : product.image ? [product.image.toString()] : []; // If it's a single image, convert it to an array

    // Serialize the product data, including sizes with their stock, price, and discountPrice
    const serializedProduct = {
      _id: product._id.toString(),  // Convert MongoDB ObjectId to string
      name: product.name,
      description: product.description,
      price: product.discountPrice || product.price,  // Use the discountPrice if it exists
      discountPercentage: product.discountPercentage,
      image: images, // Array of images
      category: product.category,
      stock: product.stock, // General stock (this is still useful for fallback purposes)
      sizes: {
        XS: {
          stock: product.sizes?.XS?.stock || 0,
          price: product.sizes?.XS?.discountPrice || product.sizes?.XS?.price || product.discountPrice || product.price // Check for discountPrice in the size first
        },
        S: {
          stock: product.sizes?.S?.stock || 0,
          price: product.sizes?.S?.discountPrice || product.sizes?.S?.price || product.discountPrice || product.price
        },
        M: {
          stock: product.sizes?.M?.stock || 0,
          price: product.sizes?.M?.discountPrice || product.sizes?.M?.price || product.discountPrice || product.price
        },
        L: {
          stock: product.sizes?.L?.stock || 0,
          price: product.sizes?.L?.discountPrice || product.sizes?.L?.price || product.discountPrice || product.price
        },
        XL: {
          stock: product.sizes?.XL?.stock || 0,
          price: product.sizes?.XL?.discountPrice || product.sizes?.XL?.price || product.discountPrice || product.price
        },
        XXL: {
          stock: product.sizes?.XXL?.stock || 0,
          price: product.sizes?.XXL?.discountPrice || product.sizes?.XXL?.price || product.discountPrice || product.price
        }
      },
    };

    return serializedProduct; // Return the serialized product data with sizes and stock

  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Unable to fetch product');
  }
}
