import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-white border-t border-cyan-200 shadow-inner rounded-t-2xl px-4 md:px-[200px] py-8 mt-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start items-center text-sm md:text-md gap-8">
        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold text-cyan-700 mb-2">Feature Blogs</p>
          <a href="#" className="text-gray-600 hover:text-cyan-600 transition">Most Viewed</a>
          <a href="#" className="text-gray-600 hover:text-cyan-600 transition">Readers Choice</a>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold text-cyan-700 mb-2">Community</p>
          <a href="#" className="text-gray-600 hover:text-cyan-600 transition">Forum</a>
          <a href="#" className="text-gray-600 hover:text-cyan-600 transition">Support</a>
          <a href="#" className="text-gray-600 hover:text-cyan-600 transition">Recent Post</a>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold text-cyan-700 mb-2">About</p>
          <a href="#" className="text-gray-600 hover:text-cyan-600 transition">Privacy Policy</a>
          <a href="#" className="text-gray-600 hover:text-cyan-600 transition">About Us</a>
          <a href="#" className="text-gray-600 hover:text-cyan-600 transition">Terms & Conditions</a>
        </div>
      </div>
      <div className="text-center text-gray-400 text-xs mt-8">
        <span className="font-semibold text-cyan-700">NeBlog</span> &copy; {new Date().getFullYear()} &mdash; All rights reserved
      </div>
    </footer>
  );
}
export default Footer;