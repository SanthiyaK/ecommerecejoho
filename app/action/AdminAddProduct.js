"use server";
import fs from 'fs';
import path from 'path';
import dbconnect from "@/db/dbconnect";
import Product from "@/model/ProductModel";

// Function to handle adding a product with multiple images and sizes
export async function addProduct(formData) {
  try {
    await dbconnect(); // Ensure DB is connected

    // Extract the form data
    const name = formData.get("name");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price"));
    const category = formData.get("category");
    const stock = parseInt(formData.get("stock")) || 0;  // Overall stock
    const image = formData.getAll("image");  // This should get all the files as an array
    const discountPercentage = parseFloat(formData.get("discountPercentage"));

    // Extract size-specific stock and price values (XS, S, M, L, XL, XXL)
    const sizes = {
      XS: {
        stock: parseInt(formData.get("size_XS_stock")) || 0,
        price: parseFloat(formData.get("size_XS_price")) || price,
      },
      S: {
        stock: parseInt(formData.get("size_S_stock")) || 0,
        price: parseFloat(formData.get("size_S_price")) || price,
      },
      M: {
        stock: parseInt(formData.get("size_M_stock")) || 0,
        price: parseFloat(formData.get("size_M_price")) || price,
      },
      L: {
        stock: parseInt(formData.get("size_L_stock")) || 0,
        price: parseFloat(formData.get("size_L_price")) || price,
      },
      XL: {
        stock: parseInt(formData.get("size_XL_stock")) || 0,
        price: parseFloat(formData.get("size_XL_price")) || price,
      },
      XXL: {
        stock: parseInt(formData.get("size_XXL_stock")) || 0,
        price: parseFloat(formData.get("size_XXL_price")) || price,
      },
    };

    // Ensure the directory exists to store images
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Process each image and save it to the filesystem
    const imageUrls = [];
    for (let imageFile of image) {
      const imageName = `${Date.now()}-${imageFile.name}`;  // Unique name based on timestamp
      const imagePath = path.join(uploadDir, imageName);

      // Convert the image to a buffer and write it to the file system
      const buffer = await imageFile.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);
      fs.writeFileSync(imagePath, uint8Array);

      // Push the image URL to the array (relative to the public folder)
      imageUrls.push(`/uploads/${imageName}`);
    }

    // Create a new product with multiple images and sizes
    const newProduct = new Product({
      name,
      description,
      price,  // Base price (can be overridden by size-specific prices)
      category,
      stock,  // Overall stock
      image: imageUrls,  // Store the array of image URLs
      discountPercentage,
      sizes,  // Add sizes to the product
    });

    // Save the new product to the database
    await newProduct.save();

    return { success: true, message: "Product added successfully!" };
  } catch (error) {
    console.error("Error adding product:", error);
    return { success: false, message: "Failed to add product" };
  }
}
