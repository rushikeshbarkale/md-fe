import { useState } from "react";
import { Link } from "react-router-dom";

import logoImg from "../assets/medicallogo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-sm fixed w-full z-50">
      <div className="px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src={logoImg}
            alt="Company Logo"
            className="h-10 w-10 md:h-12 md:w-12"
          />
          <span className="text-xl font-semibold text-gray-700">MedMarket</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About Us
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">
            Contact Us
          </Link>
          {/* <Link
            to="/login"
            className="bg-white border border-slate-300 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100"
          >
            Login/Register
          </Link> */}
          <Link
            to="/"
            // className="bg-blue-600 border border-slate-300 text-white px-4 py-2 rounded-full hover:bg-blue-700"
            className="relative bg-blue-600 border border-slate-300 text-white px-4 py-2 rounded-full hover:bg-blue-700"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Add a Listing
            {isHovered && (
              <div className="absolute right-0 transform -translate-x-1/2 bg-gray-700 text-white text-xs mt-4 py-1 px-2 rounded-md z-50">
                Coming Soon
              </div>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-white shadow-lg z-40`}
      >
        <div className="flex flex-col items-center space-y-3 py-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
          {/* <Link
            to="/login"
            // className="text-gray-700 hover:text-blue-600"
            className="bg-white border border-slate-300 text-blue-600 px-4 py-1 rounded-full hover:bg-blue-100 hover:rounded"
            onClick={() => setIsOpen(false)}
          >
            Login/Register
          </Link> */}
          <Link
            to="/"
            className="bg-blue-600 border border-slate-300 text-white px-4 py-1 rounded-full hover:bg-blue-700 hover:rounded"
            onClick={() => setIsOpen(false)}
          >
            Add a Listing
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
