import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="p-8 bg-teal-500 text-white">
    <div className="container mx-auto px-4 md:px-8 lg:px-16">
      <div className="flex flex-col md:flex-row justify-between">
        {/* Platform Info */}
        <div className="mb-8 md:mb-0">
          <h1 className="text-2xl font-bold">E-Learning Platform</h1>
          <p className="mt-2 max-w-sm">Your path to success starts here. Explore a variety of courses and enhance your skills with the best online education expertise.</p>
        </div>

        {/* Useful Links */}
        <div className="mb-8 md:mb-0">
          <h2 className="font-bold">Useful Links</h2>
          <ul className="mt-2 space-y-2">
            <li><Link to="/about" className="text-white hover:underline">About Us</Link></li>
            <li><Link to="/courses" className="text-white hover:underline">Courses</Link></li>
            <li><Link to="/contact" className="text-white hover:underline">Contact</Link></li>
            <li><Link to="/privacy-policy" className="text-white hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="text-white hover:underline">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="mb-8 md:mb-0">
          <h2 className="font-bold">Contact Us</h2>
          <p className="mt-2">Gwarko,Lalitpur<br />Email: asim.201541@ncit.edu.np<br />Phone: 9864378003</p>
        </div>

        {/* Social Media Links */}
        <div className="mb-8 md:mb-0">
          <h2 className="font-bold">Follow Us</h2>
          <div className="mt-2 flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
          </div>
        </div>
      </div>

     {/* Newsletter Subscription */}
      {/* <div className="mt-8 md:mt-0 text-center">
        <h2 className="font-bold">Subscribe to Our Newsletter</h2>
        <form className="mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-l-md text-gray-700"
          />
          <button className="bg-white text-teal-500 px-4 py-2 rounded-r-md hover:bg-gray-100 transition">
            Subscribe
          </button>
        </form>
      </div> */}

      {/* Footer Bottom */}
      <div className="mt-8 text-center">
        <p>© {new Date().getFullYear()} E-Learning Platform. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
