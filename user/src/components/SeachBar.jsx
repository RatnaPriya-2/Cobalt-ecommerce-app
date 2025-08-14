import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { useGlobalContext } from "../context/context";

const SeachBar = () => {
  const { setSearchTerm } = useGlobalContext();
  return (
    <div className="py-2 md:py-6 px-4 sm:px-6 md:px-8 lg:px-20">
      <div className="input-cluster flex items-center justify-center w-full md:w-1/2 border border-gray-300 rounded-full overflow-hidden mx-auto">
        <input
          type="text"
          placeholder="Search for a product..."
          className="flex-1 px-5 placeholder:text-sm border-none outline-none text-gray-700"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="w-20 h-11 bg-gray-200 cursor-pointer flex items-center justify-center">
          <img src={assets.search_icon} alt="search-icon" className="w-4" />
        </div>
      </div>
    </div>
  );
};

export default SeachBar;
