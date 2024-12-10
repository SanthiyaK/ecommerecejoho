// app/payment-success/page.js (for Next.js 13+ with app directory)
"use client";


import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-green-500">Payment Successful!</h2>
        <p className="mt-4 text-lg text-gray-600">Thank you for your purchase. Your payment has been processed successfully.</p>
        <div className="mt-6">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
