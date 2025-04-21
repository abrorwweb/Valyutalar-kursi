import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Hamburger va close iconlar

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gradient bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          CryptoTracker
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-pink-400 transition">Home</Link>
          <Link to="/markets" className="hover:text-pink-400 transition">Markets</Link>
          <Link to="/portfolio" className="hover:text-pink-400 transition">Portfolio</Link>
        </div>

        {/* Dark/Light + User */}
        <div className="flex items-center gap-4">
          {/* Dark/Light toggle */}
          <label className="swap swap-rotate">
            <input type="checkbox" />

            {/* Sun */}
            <svg className="swap-on w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="..." />
            </svg>

            {/* Moon */}
            <svg className="swap-off w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="..." />
            </svg>
          </label>

          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold">
            A
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col space-y-3 bg-black border-t border-gray-800">
          <Link to="/" className="hover:text-pink-400" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/markets" className="hover:text-pink-400" onClick={() => setIsOpen(false)}>Markets</Link>
          <Link to="/portfolio" className="hover:text-pink-400" onClick={() => setIsOpen(false)}>Portfolio</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
