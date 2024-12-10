"use client"
import { CartContext } from '@/context/CartContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { TrashIcon } from '@heroicons/react/outline';

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, updateCartSize } = useContext(CartContext);
  const router = useRouter();

  const handleIncreaseQuantity = (productId, size, stock) => {
    increaseQuantity(productId, size, stock); // Ensure stock is passed for increase
  };

  const handleDecreaseQuantity = (productId, size) => {
    decreaseQuantity(productId, size);
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push("/shipping");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart ({cart.length} items)</h2>

      <ul className="space-y-6">
        {cart.map((item) => {
          // Get the price for the selected size
          const selectedSizePrice = item.sizes[item.selectedSize]?.price || item.price; // Fallback to base price if size price doesn't exist
          const discountPrice = selectedSizePrice - (selectedSizePrice * (item.discountPercentage / 100)); // Apply discount

          // Ensure the image URL is valid, or use a placeholder image
          const imageUrl = item.image && item.image[0] ? item.image[0] : item.image;
          const imageSrc = imageUrl ? imageUrl : item.image[1]; // Use a fallback image if no image is found

          return (
            <li
              key={`${item._id}-${item.selectedSize}`}
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b-2 border-gray-200 rounded-lg shadow-md bg-white"
            >
              <div className="flex items-center space-x-4">
                {/* Only render the image if the src is valid */}
                <Image
                  src={imageSrc}
                  alt={item.name}
                  width={75}
                  height={75}
                  className="rounded-md"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-sm text-gray-700">
                    ${discountPrice.toFixed(2)} {/* Display discounted price */}
                    {item.discountPercentage > 0 && (
                      <span className="text-xs text-red-500 ml-2 line-through">${selectedSizePrice.toFixed(2)}</span>
                    )}
                  </p> {/* Display price with discount */}
                  <div className="mt-2">
                    <label className="text-sm text-gray-600">Size: </label>
                    <p className={`text-sm text-gray-800 ${item.selectedSize === 'M' ? 'bg-blue-200' : item.selectedSize === 'L' ? 'bg-green-200' : 'bg-red-200'} px-2 py-1 rounded-full`}>
                      {item.selectedSize}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-4 md:mt-0 space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleIncreaseQuantity(item._id, item.selectedSize, item.sizes[item.selectedSize]?.stock)}
                    className="w-12 h-12 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none flex justify-center items-center text-xl"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleDecreaseQuantity(item._id, item.selectedSize)}
                    className="w-12 h-12 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none flex justify-center items-center text-xl"
                  >
                    -
                  </button>
                </div>
                <div className="text-sm text-gray-700">Qty: {item.quantity}</div>
                <button
                  onClick={() => removeFromCart(item._id, item.selectedSize)}
                  className="text-red-600 hover:text-red-800 font-semibold mt-2 md:mt-0 flex items-center space-x-2"
                >
                  <TrashIcon className="w-5 h-5 text-red-600" />
                  <span>Delete</span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 space-y-4 bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-semibold text-xl">Cart Summary</h3>
        <div className="flex justify-between text-gray-700">
          <p>Total Items:</p>
          <p>{cart.length}</p>
        </div>
        <div className="flex justify-between text-gray-700">
          <p>Total Quantity:</p>
          <p>{totalQuantity}</p>
        </div>
        <div className="flex justify-between font-semibold text-gray-800">
          <p>Total Price:</p>
          {/* Total price considering selected size and discount */}
          <p>
            ${cart.reduce((total, item) => {
              const selectedSizePrice = item.sizes[item.selectedSize]?.price || item.price;
              const discountPrice = selectedSizePrice - (selectedSizePrice * (item.discountPercentage / 100));
              return total + discountPrice * item.quantity;
            }, 0).toFixed(2)}
          </p>
        </div>
      </div>

      {cart.length > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleCheckout}
            className="px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-colors duration-200 w-full md:w-auto"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
