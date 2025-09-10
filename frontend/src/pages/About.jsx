import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="border-t pt-16 px-4 sm:px-8 lg:px-16">
      {/* Page Title */}
      <div className="text-2xl mb-6 text-center">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* About Section */}
      <div className="my-10 flex flex-col md:flex-row items-center gap-16">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-md"
          src={assets.about_img}
          alt="About our store"
        />

        <div className="max-w-2xl text-gray-700 leading-relaxed space-y-6">
          <p>
            Welcome to <span className="font-semibold">Our Store</span> — your one-stop destination for
            the latest trends in fashion and lifestyle. We believe shopping should be simple, stylish,
            and stress-free. Our mission is to bring you the best quality products at the most affordable
            prices, all while delivering a seamless shopping experience.
          </p>

          <p>
            From the moment you land on our website to the day your order arrives at your doorstep, we’re
            committed to making your journey smooth and satisfying. Every product in our collection is
            handpicked to ensure top-notch quality and style.
          </p>

          <p>
            Thank you for choosing us. We’re more than just a store — we’re a community of style
            enthusiasts, and we’re thrilled to have you on board!
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6 text-center">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Naveen Karri', role: 'Founder & CEO' },
            { name: 'Priya Sharma', role: 'Product Designer' },
            { name: 'Amit Verma', role: 'Marketing Lead' },
          ].map((member, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition"
            >
              {/* Team Member Avatar Placeholder */}
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500">
                👤
              </div>
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
