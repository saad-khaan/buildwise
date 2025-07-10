import React, { useState } from "react";
import { Link } from "react-router-dom";

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
              <li><Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Home</Link></li>
              <li><Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">About</Link></li>
              <li><Link to="/map" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Map</Link></li>
              <li><Link to="/checklist" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Checklist</Link></li>
              <li><Link to="/chatbot" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Chatbot</Link></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;