import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import SectionTitle from "../components/SectionTitle";
import SubscribeSection from "../components/SubscribeSection";

const Contact = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-20">
      <SectionTitle firstText="CONTACT" secondText="US" />
      <div className="main-body flex justify-between">
        <div className="left-section w-1/2">
          <img
            src={assets.contact_img}
            alt="about-img"
            className="lg:w-[550px]"
          />
        </div>
        <div className="right-section w-1/2 flex flex-col justify-center gap-8 text-sm text-gray-500 ">
          <p className="text-xl text-gray-700 font-bold">OUR STORE</p>
          <div>
            <p>2094, Oak street</p>
            <p>San Francisco, USA</p>
          </div>
          <div>
            <p>Tel: +1 398-564-6590</p>
            <p>Email: cobalt@gmail.com</p>
          </div>

          <p className="text-xl text-gray-700 font-bold">CAREERS AT FOREVER</p>
          <p>Learn more about our teams and job openings.</p>
          <button className="py-4 border-2 border-gray-500 w-[160px] text-gray-700 cursor-pointer">Explore Jobs</button>
        </div>
      </div>

      <div className="mt-40 mb-60">
        <SubscribeSection />
      </div>
    </div>
  );
};

export default Contact;
