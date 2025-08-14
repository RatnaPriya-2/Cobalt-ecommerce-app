import { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { url, useGlobalContext } from "../context/context";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const {
    isSearchbarVisible,
    setIsSearchbarVisible,
    cartProducts,
    userToken,
    setUserToken,
    state,
    setState,
  } = useGlobalContext();

  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      let response = await axios.post(
        `${url}/api/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setState("Login");
        localStorage.removeItem("userToken");
        setUserToken("");
        toast.success(response.data.message);
        navigate("/");
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20">
        <div className=" flex justify-between items-center border-b border-gray-400">
          <Link to="/">
            <div className="logo py-4 md:py-5">
              <img src={assets.logo} alt="logo" className="h-[28px] md:h-10" />
            </div>
          </Link>
          <div className="navlinks hidden md:block">
            <ul className="flex gap-10">
              <NavLink to="/" className="flex flex-col items-center gap-[3px]">
                <p className="text-gray-700">HOME</p>
                <hr className="border-gray-600 border-1 rounded-full w-3/4 hidden" />
              </NavLink>

              <NavLink
                to="/about"
                className="flex flex-col items-center gap-[3px]"
              >
                <p className="text-gray-700">ABOUT</p>
                <hr className="border-gray-600 border-1 rounded-full w-3/4 hidden" />
              </NavLink>
              <NavLink
                to="/productCollection"
                className="flex flex-col items-center gap-[3px] "
              >
                <p className="text-gray-700">PRODUCTS</p>
                <hr className="border-gray-600 border-1 rounded-full w-3/4 hidden" />
              </NavLink>
              <NavLink
                to="/contact"
                className="flex flex-col items-center gap-[3px]"
              >
                <p className="text-gray-700">CONTACT</p>
                <hr className="border-gray-600 border-1 rounded-full w-3/4 hidden" />
              </NavLink>
            </ul>
          </div>
          <div className="links flex gap-5 md:gap-7">
            <img
              src={assets.search_icon}
              alt="search-icon"
              className="h-4 md:h-6 cursor-pointer"
              onClick={() => setIsSearchbarVisible(!isSearchbarVisible)}
            />
            <div className="group relative">
              <img
                src={assets.profile_icon}
                alt="profile icon"
                className="h-4 md:h-6 cursor-pointer"
              />

              <div
                className={`drop-down hidden absolute right-[-5px] group-hover:block w-36 pt-2 `}
              >
                <ul className="list-none bg-gray-200 text-gray-600 p-2 rounded">
                  {userToken && userToken !== "" ? (
                    <>
                      <li className="p-1 text-sm hover:text-black transition-all cursor-pointer">
                        My Profile
                      </li>
                      <li
                        onClick={() => navigate("/orders")}
                        className="p-1 text-sm hover:text-black transition-all cursor-pointer"
                      >
                        Orders
                      </li>
                      <li
                        className="p-1 text-sm hover:text-black transition-all cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </>
                  ) : (
                    <>
                      <li
                        className="p-1 text-sm hover:text-black transition-all cursor-pointer"
                        onClick={() => {
                          setState("Sign Up");
                          navigate("/signup");
                        }}
                      >
                        Sign Up
                      </li>
                      <li
                        className="p-1 text-sm hover:text-black transition-all cursor-pointer"
                        onClick={() => {
                          setState("Login");
                          navigate("/signup");
                        }}
                      >
                        Login
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div
              className="cart-image relative group"
              onClick={() => navigate("/cart")}
            >
              <img
                src={assets.cart_icon}
                alt="cart-icon"
                className="h-4 md:h-6 cursor-pointer"
              />

              <p className="cart-quantity flex items-center justify-center absolute  bg-black rounded-full  w-[16px] h-[16px] md:w-[20px] md:h-[20px]  text-[8px] md:text-[10px] text-white right-[-8px] bottom-[-10px]">
                {cartProducts.length}
              </p>
            </div>
            <img
              src={assets.menu_icon}
              alt="menu-icon"
              className="h-4 md:hidden cursor-pointer"
              onClick={() => setIsVisible(true)}
            />
          </div>
          <div
            className={`small-screen-menu fixed top-0 right-0 h-full bg-white overflow-hidden transition-all duration-300 ease-in-out z-50 ${
              isVisible ? "w-full" : "w-0"
            }`}
          >
            <div className="">
              <div
                className="back-cluster flex items-center gap-2 p-4 cursor-pointer"
                onClick={() => setIsVisible(false)}
              >
                <img
                  src={assets.back_icon}
                  alt="left-chevron"
                  className="h-4"
                />
                <p className="text-gray-700 hover:text-black transition-all">
                  Back
                </p>
              </div>
              <ul className="text-gray-700  mt-5 ">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-6 py-2 border border-gray-300 w-full inline-block text-sm ${
                      isActive ? "bg-gray-700 text-white" : "text-black"
                    }`
                  }
                  onClick={() => setIsVisible(false)}
                >
                  HOME
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `px-6 py-2 border border-gray-300 w-full inline-block text-sm ${
                      isActive ? "bg-gray-700 text-white" : "text-black"
                    }`
                  }
                  onClick={() => setIsVisible(false)}
                >
                  ABOUT
                </NavLink>
                <NavLink
                  to="/productCollection"
                  className={({ isActive }) =>
                    `px-6 py-2 border border-gray-300 w-full inline-block text-sm ${
                      isActive ? "bg-gray-700 text-white" : "text-black"
                    }`
                  }
                  onClick={() => setIsVisible(false)}
                >
                  PRODUCTS
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `px-6 py-2 border border-gray-300 w-full inline-block text-sm ${
                      isActive ? "bg-gray-700 text-white" : "text-black"
                    }`
                  }
                  onClick={() => setIsVisible(false)}
                >
                  CONTACT
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
