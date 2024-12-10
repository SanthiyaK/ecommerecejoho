import Image from "next/image";

export default function Home() {
  return (
   <>
    <section className="relative w-full h-[500px] sm:h-[600px] bg-blue-50">
      <Image
        src="/kid_dresses/product9.webp" // Add your hero image to the public/images folder
        alt="Kids Dresses"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 object-cover opacity-60"
      />
      <div className="relative z-10 flex items-center justify-center w-full h-full text-center text-white px-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Discover the Best Kids Dresses for Every Occasion
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Shop our collection of stylish, comfortable, and fun dresses for your little ones!
          </p>
          <a
            href="#products" // Link to the products section
            className="inline-block px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-lg transform transition-all hover:bg-green-700 hover:scale-105"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
   </>
  );
}
