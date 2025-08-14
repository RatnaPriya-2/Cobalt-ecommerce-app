import React from "react";

const SubscribeSection = () => {
  return (
    <div className="m-auto text-center mb-35 flex flex-col justify-center gap-5 w-full md:w-3/4">
      <p className="text-2xl text-gray-800 font-medium">Subscribe now & get 20% off</p>
      <p className="text-gray-500 text-[12px]  m-auto">
        Lorem ipsum is simply dummy text of the printing and typesetting
        industry{" "}
      </p>
      <form
        action=""
        method="post"
        className="flex items-center justify-center  mx-auto "
      >
        <input
          type="text"
          placeholder="Enter your email id"
          className="w-[330px] md:w-[400px] h-10 px-4 placeholder:text-[12px] placeholder:text-gray-400 outline-none flex-1 border border-r-0 border-gray-300"
        />
        <button className="bg-black border-none text-white text-[12px] px-7 h-10 font-light">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default SubscribeSection;
