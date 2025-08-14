import React from "react";

const SectionTitle = ({ firstText, secondText }) => {
  return (
    <div className="flex gap-3 text-xl items-center justify-center my-10">
      <p className="text-gray-600">
        {firstText}{" "}
        <span className="text-gray-800 font-semibold ">{secondText}</span>
      </p>
      <p className="h-[2px] w-12 bg-gray-500 rounded-full"></p>
    </div>
  );
};

export default SectionTitle;
