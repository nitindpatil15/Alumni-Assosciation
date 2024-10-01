import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Alumni Association</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        <div className={`md:flex items-center space-x-4 ${isOpen ? "block" : "hidden"} md:block`}>
          <Link to="/" className="text-white hover:bg-blue-700 p-2 rounded">
            Home
          </Link>
          <Link to="/dashboard" className="text-white hover:bg-blue-700 p-2 rounded">
            Dashboard
          </Link>
          <Link to="/login" className="text-white hover:bg-blue-700 p-2 rounded">
            Login
          </Link>
          <Link to="/signup" className="text-white hover:bg-blue-700 p-2 rounded">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
