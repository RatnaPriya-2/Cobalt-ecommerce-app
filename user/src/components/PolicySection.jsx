import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const PolicySection = () => {
  return (
    <div className="w-3/4 m-auto flex flex-col gap-10  md:flex-row justify-around my-35">
      <div className="exchange flex flex-col items-center justify-center">
        <img src={assets.exchange_icon} alt="exchange_icon" className="w-10" />
        <p className="text-sm text-gray-800 font-semibold mt-3 mb-1">
          Easy Exchange Policy
        </p>
        <p className="text-gray-500 text-sm">
          We offer hassle free exchange policy
        </p>
      </div>
      <div className="return flex flex-col items-center justify-center">
        <img src={assets.quality_icon} alt="return" className="w-10" />
        <p className="text-sm text-gray-800 font-semibold mt-3 mb-1">
          7 Days Return Policy
        </p>
        <p className="text-gray-500 text-sm">
          We provide 7 days free return policy
        </p>
      </div>
      <div className="exchange flex flex-col items-center justify-center">
        <img src={assets.support_img} alt="support-icon" className="w-10" />
        <p className="text-sm text-gray-800 font-semibold mt-3 mb-1">
          Best Customer Support
        </p>
        <p className="text-gray-500 text-sm">
          We provide 24/7 customer support
        </p>
      </div>
    </div>
  );
};

export default PolicySection;
