import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-white mt-40 text-gray-700 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10">

        {/* Logo and about */}
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="Company Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
          </p>
        </div>

        {/* Company links */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>

      </div>
      <hr />
      <p className='py-5 text-sm text-center text-gray-400'>
        © {new Date().getFullYear()} ForeverYou. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
