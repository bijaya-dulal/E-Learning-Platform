import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-teal-500 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 relative">
        <div className="text-2xl font-bold">
          <Link to="/">Logo</Link>
        </div>
        <div className="md:hidden absolute right-4 top-4">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              ></path>
            </svg>
          </button>
        </div>
        <div className={`md:flex items-center ${isOpen ? 'block' : 'hidden'} w-full md:w-auto mt-4 md:mt-0`}>
          <Link to="/" className="block md:inline-block mt-4 md:mt-0 px-4 py-2">Home</Link>
          <Link to="/courses" className="block md:inline-block mt-4 md:mt-0 px-4 py-2">Courses</Link>
          <Link to="/about" className="block md:inline-block mt-4 md:mt-0 px-4 py-2">About</Link>
          <Link to="/contact" className="block md:inline-block mt-4 md:mt-0 px-4 py-2">Contact</Link>
          <div className="md:hidden flex items-center mt-4">
            <Link to="/StudentDashboard">
              <img src="/path-to-your-image.jpg" alt="User" className="w-8 h-8 rounded-full" />
            </Link>
            <Link to="/StudentDashboard" className="block md:inline-block px-4 py-2">Dashboard</Link>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/StudentDashboard">
            <img src="/path-to-your-image.jpg" alt="User" className="w-8 h-8 rounded-full" />
          </Link>
          <Link to="/signin" className="block md:inline-block mt-4 md:mt-0 px-4 py-2">Sign In</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
