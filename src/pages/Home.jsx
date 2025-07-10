import React from "react";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl font-bold text-blue-400 mb-4">BuildWise</h1>
        <p className="text-gray-300 text-lg mb-8 max-w-xl">
          Your guide to zoning, permits, and construction in Canada.
        </p>
        <a href="#about" className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded transition">
          Start Exploring
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-16 bg-[#1e293b]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">About BuildWise</h2>
          <p className="text-gray-300">
            BuildWise simplifies complex municipal processes so Canadians can focus on building. 
            With an interactive map, AI chatbot, and permit checklist, it makes zoning and regulations accessible to everyone.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
