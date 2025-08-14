import React from "react";
import { assets } from "../assets/admin_assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {


  return (
    <div className="w-[30%] text-gray-700 min-h-screen  border-r border-r-gray-300 py-5">
      <div className="  mb-5">
        <NavLink
          to="/add"
          className="flex  items-center gap-3 cursor-pointer px-3 py-2 border border-r-0  border-gray-300"
        >
          <img className="w-5" src={assets.add_icon} alt="add-icon" />
          <p className="">Add</p>
        </NavLink>
      </div>
      <div className="mb-5">
        <NavLink
          to="/list"
          className="flex  items-center gap-3 cursor-pointer px-3 py-2 border border-r-0  border-gray-300"
        >
          <img className="w-5" src={assets.list} alt="list-icon" />
          <p className="">List</p>
        </NavLink>
      </div>
      <div className="mb-5">
        <NavLink
          to="/orders"
          className="flex  items-center gap-3 cursor-pointer px-3 py-2 border border-r-0  border-gray-300"
        >
          <img className="w-5" src={assets.order_icon} alt="order-icon" />
          <p className="">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
