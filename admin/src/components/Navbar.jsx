import React from "react";
import { assets } from "../assets/admin_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/AdminContext";

const Navbar = () => {
  const { token, handleLogout } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20 ">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="logo py-4 md:py-5">
              <img src={assets.logo} alt="logo" className="h-[28px] md:h-10" />
            </div>
          </Link>
          {token && (
            <button
              className="px-5 py-2 text-sm bg-slate-700 text-white rounded-full cursor-pointer"
              onClick={() => handleLogout(navigate)}
            >
              Logout
            </button>
          )}
        </div>
        <hr className="border-gray-300" />
      </div>
    </>
  );
};

export default Navbar;
