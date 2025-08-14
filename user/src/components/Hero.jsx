import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="grid place-items-center px-4 sm:px-6 md:px-8 lg:px-20">
      <div className="w-full md:w-full flex flex-col md:flex-row gap-2 border-1 overflow:hidden border-gray-300">
        <div className="left-section w-full md:w-1/2 py-10 md:py-0 flex items-center justify-center">
          <div className="flex flex-col items-start justify-center">
            <div className="first-line-hero flex items-center justify-start gap-2">
              <p className="h-[2px] w-12 bg-gray-500 rounded-full "></p>
              <p className="text-sm text-gray-700">OUR BESTSELLERS</p>
            </div>
            <p className="playfair text-4xl text-gray-700 leading-relaxed">
              Latest Arrivals
            </p>
            <div className="last-line-hero flex items-center gap-2 mt-2">
              <p className="text-sm text-gray-700">SHOP NOW</p>
              <p className="h-[2px] w-12 bg-gray-500 rounded-full "></p>
            </div>
          </div>
        </div>
        <div className="right-section md:w-1/2 mr-[-1.5px] mb-[-1px]">
          <img
            src={assets.hero_img}
            alt="hero-img"
            className="max-w-full block"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
