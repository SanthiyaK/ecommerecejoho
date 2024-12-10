"use server";
import fs from 'fs';
import path from 'path';
import dbconnect from "@/db/dbconnect";
import Product from "@/model/ProductModel";

// Handling the product editing with multiple images, discount percentage, and size stock
export async function editProduct(productId, formData) {
  try {
    await dbconnect(); // Connect to the database

    // Find the existing product by ID
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Extract data from the form (use existing values if not provided)
    const name = formData.get("name") || product.name;
    const description = formData.get("description") || product.description;
    const price = parseFloat(formData.get("price")) || product.price;
    const category = formData.get("category") || product.category;
    const stock = parseInt(formData.get("stock")) || product.stock;
    const discountPercentage = parseFloat(formData.get("discountPercentage")) || product.discountPercentage;

    // Handle the size-specific stock and price (if provided in the form)
    const sizes = {
      XS: {
        stock: parseInt(formData.get("size_XS_stock")) || product.sizes.XS.stock,
        price: parseFloat(formData.get("size_XS_price")) || product.sizes.XS.price || price,
      },
      S: {
        stock: parseInt(formData.get("size_S_stock")) || product.sizes.S.stock,
        price: parseFloat(formData.get("size_S_price")) || product.sizes.S.price || price,
      },
      M: {
        stock: parseInt(formData.get("size_M_stock")) || product.sizes.M.stock,
        price: parseFloat(formData.get("size_M_price")) || product.sizes.M.price || price,
      },
      L: {
        stock: parseInt(formData.get("size_L_stock")) || product.sizes.L.stock,
        price: parseFloat(formData.get("size_L_price")) || product.sizes.L.price || price,
      },
      XL: {
        stock: parseInt(formData.get("size_XL_stock")) || product.sizes.XL.stock,
        price: parseFloat(formData.get("size_XL_price")) || product.sizes.XL.price || price,
      },
      XXL: {
        stock: parseInt(formData.get("size_XXL_stock")) || product.sizes.XXL.stock,
        price: parseFloat(formData.get("size_XXL_price")) || product.sizes.XXL.price || price,
      },
    };

    // Handle the image file upload (if new images are provided)
    const imageFiles = formData.getAll("image"); // Get multiple image files
    let imageUrls = product.image || []; // Default to existing images

    if (imageFiles.length > 0) {
      // Ensure the upload directory exists
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Delete old images if necessary
      for (let oldImage of product.image) {
        const oldImagePath = path.join(process.cwd(), 'public', oldImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Remove the old image file
        }
      }

      // Process and upload new images
      imageUrls = []; // Clear the existing image URLs

      for (let imageFile of imageFiles) {
        const imageName = `${Date.now()}-${path.extname(imageFile.name)}`;
        const imagePath = path.join(uploadDir, imageName);
        
        // Convert the image to buffer and save
        const buffer = await imageFile.arrayBuffer();
        const uint8Array = new Uint8Array(buffer);
        fs.writeFileSync(imagePath, uint8Array);

        // Push the new image URL to the imageUrls array
        imageUrls.push(`/uploads/${imageName}`);
      }
    }

    // Update the product with the new data
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.stock = stock;
    product.discountPercentage = discountPercentage;
    product.sizes = sizes;  // Set the updated size stock and price
    product.image = imageUrls; // Set the new image URLs

    // Save the updated product in the database
    await product.save();

    return { success: true, message: "Product updated successfully!" };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, message: "Failed to update product" };
  }
}
