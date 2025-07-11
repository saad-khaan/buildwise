import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="text-center py-8">
      <Link to="/" className="text-4xl font-bold text-blue-400 hover:text-blue-500 transition">
        BuildWise
      </Link>
    </header>
  );
};

export default Header;