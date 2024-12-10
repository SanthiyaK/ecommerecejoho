"use client";

import Image from 'next/image';  // Import Image component from next/image

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header Section */}
      <header className="bg-blue-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 text-lg">Learn more about our mission, values, and team.</p>
      </header>

      {/* Main Content Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Mission Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
            <p className="mt-4 text-lg text-gray-600">
              We aim to provide the best kids&apos; clothing that is both stylish and comfortable. Our goal is to make sure every child feels great in what they wear while parents get the best value for their money.
            </p>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-blue-600">Quality</h3>
              <p className="mt-4 text-gray-600">
                We prioritize high-quality fabrics that ensure both comfort and durability, keeping kids happy and healthy.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-blue-600">Sustainability</h3>
              <p className="mt-4 text-gray-600">
                We strive to be eco-friendly by sourcing sustainable materials and using ethical production processes.
              </p>
            </div>
          </div>

          {/* Our Team Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-800">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-600">Our dedicated team is passionate about bringing the best clothing to kids everywhere.</p>

            {/* Team Members */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              {/* Team Member 1 */}
              <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
                <Image 
                  className="w-full h-64 object-cover"
                  src="/images/team1.jpg"
                  alt="Team Member 1"
                  width={500}  // Add a width for optimization
                  height={500} // Add a height for optimization
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
                  <p className="text-gray-500">CEO &amp; Founder</p>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
                <Image
                  className="w-full h-64 object-cover"
                  src="/images/team2.jpg"
                  alt="Team Member 2"
                  width={500}
                  height={500}
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
                  <p className="text-gray-500">Lead Designer</p>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
                <Image
                  className="w-full h-64 object-cover"
                  src="/images/team3.jpg"
                  alt="Team Member 3"
                  width={500}
                  height={500}
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">Alice Johnson</h3>
                  <p className="text-gray-500">Marketing Manager</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
