import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { useGlobalContext } from "../context/context";

const DropDown = () => {
  const { selectedOption, showDropdown, setShowDropdown, handleDropdown } =
    useGlobalContext();

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);

    return () => document.removeEventListener("mousedown", handleClickOutSide);
  });

  const dropdownOptions = [
    {
      value: "relevant",
      label: (
        <>
          <span className="text-gray-500">Sort by:</span> Relevant
        </>
      ),
    },
    {
      value: "low",
      label: (
        <>
          <span className="text-gray-500">Sort by:</span> Price: Low to High
        </>
      ),
    },
    {
      value: "high",
      label: (
        <>
          <span className="text-gray-500">Sort by:</span> Price: High to Low
        </>
      ),
    },
  ];

  return (
    <div className="relative inline-block w-64" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full bg-white border border-gray-300  px-4 py-2 text-left flex justify-between items-center"
      >
        <span>{selectedOption}</span>
        <img
          src={assets.dropdown_icon}
          alt="dropdown-icon "
          className="rotate-90 w-3"
        />
      </button>

      {/* Dropdown options */}

      <ul
        className={`absolute z-10 mt-1 w-full bg-white border border-gray-300  shadow-md ${
          showDropdown ? "block" : "hidden"
        }`}
      >
        {dropdownOptions.map((option, index) => (
          <li
            key={index}
            onClick={() => handleDropdown(option)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
