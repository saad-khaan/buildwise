import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 right-0 p-4 z-50">
      <div className="relative">
        <button
          className="space-y-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-8 h-1 bg-white"></span>
          <span className="block w-8 h-1 bg-white"></span>
          <span className="block w-8 h-1 bg-white"></span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-[#1e293b] border border-gray-700 p-4 rounded shadow">
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-blue-400">About</a></li>
              <li><a href="#" className="hover:text-blue-400">Map</a></li>
              <li><a href="#" className="hover:text-blue-400">Checklist</a></li>
              <li><a href="#" className="hover:text-blue-400">Chatbot</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
