import React from "react";
import SectionTitle from "../components/SectionTitle";
import { assets } from "../assets/frontend_assets/assets";
import SubscribeSection from "../components/SubscribeSection";

const About = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-20">
      <SectionTitle firstText="ABOUT" secondText="US" />
      <div className="main-body flex justify-between">
        <div className="left-section w-1/2">
          <img
            src={assets.about_img}
            alt="about-img"
            className="lg:w-[550px]"
          />
        </div>
        <div className="right-section w-1/2 flex flex-col justify-center gap-8 text-sm text-gray-500 ">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>

          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <p className="text-sm text-gray-500 font-bold">Our Mission</p>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>
      <div className="choose-us w-full py-10">
        <SectionTitle firstText="WHY" secondText="CHOOSE US" />
        <div className="choose-reasons flex items-center justify-around">
          <div className="flex-1 px-15 py-22 border border-gray-400 ">
            <div className=" w-full mx-auto">
              <p className="text-md text-gray-700 font-semibold mb-6">
                QUALITY ASSURANCE
              </p>
              <p className="text-sm text-gray-500 w-[250px] leading-relaxed">
                We meticulously select and vet each product to ensure it meets
                our stringent quality.
              </p>
            </div>
          </div>
          <div className="flex-1 px-15 py-22 border border-gray-400 border-l-0">
            <div className=" w-full mx-auto">
              <p className="text-md text-gray-700 font-semibold mb-6">
                CONVENIENCE
              </p>
              <p className="text-sm text-gray-500 w-[250px] leading-relaxed">
                With our user-friendly interface and hassle free ordering
                process, shoppin has never been easier.
              </p>
            </div>
          </div>
          <div className="flex-1 px-15 py-22 border border-gray-400 border-l-0">
            <div className=" w-full mx-auto">
              <p className="text-md text-gray-700 font-semibold mb-6">
                EXCEPTIONAL CUSTOMER SERVICE
              </p>
              <p className="text-sm text-gray-500 w-[250px] leading-relaxed">
                Our team of dedicated professionals is here to assist you the
                way. Ensuring your satisfaction is our top priority.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-30 mb-60">
        <SubscribeSection />
      </div>
    </div>
  );
};

export default About;
