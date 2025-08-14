import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <>
      <div className=" flex flex-col items-center md:items-start md:flex-row md:gap-10 lg:gap-20 my-25 px-4 sm:px-6 md:px-8 lg:px-20 w-full">
        <div className="logo-description md:w-[500px] lg:w-[700px] flex flex-col items-center md:items-start">
          <img src={assets.logo} alt="logo" className="h-[28px] md:h-10" />
          <p className="text-gray-500 text-sm mt-8 md:w-3/4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum neque
            autem a sed aperiam, laboriosam voluptates eos expedita! Officia
            illum minus voluptate animi possimus at in officiis veniam nisi
            laudantium.
          </p>
        </div>
        <div className="company flex-1">
          <p className="text-md text-gray-700 font-semibold hidden md:block">
            COMPANY
          </p>
          <ul className="flex md:flex-col gap-8 md:gap-2 text-sm text-gray-500 mt-8">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>

            <li>
              <Link to="/delivery">delivery</Link>
            </li>

            <li>
              <Link to="/">Private policy</Link>
            </li>
          </ul>
        </div>
        <div className="get-in-touch flex-1">
          <p className="text-md text-gray-700 font-semibold hidden md:block">
            GET IN TOUCH
          </p>
          <div className="flex md:flex-col  gap-8 md:gap-2 text-sm text-gray-500 mt-8">
            <p>+1 398-564-6590</p>
            <p>cobalt@gmail.com</p>
          </div>
        </div>
      </div>
      <hr className="border border-gray-300"/>
      <p className="text-gray-500 text-sm text-center py-5">
        Copyright 2025 &copy; Cobalt.dev - All rights reserved
      </p>
    </>
  );
};

export default FooterSection;
