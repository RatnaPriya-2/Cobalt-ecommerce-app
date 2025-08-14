import React from "react";
import { useGlobalContext } from "../context/context";
import { assets } from "../assets/frontend_assets/assets";

const CartProduct = ({ item }) => {
  let { name, price, requiredSize, image, quantity } = item;
  let { currency, handleQuantity, handleDelete } = useGlobalContext();

  return (
    <>
      <div className="product-body flex items-center justify-between">
        <div className="product-content flex gap-4">
          <div className="product-image">
            <img src={image[0]} alt={name} className="w-20" />
          </div>
          <div className="details flex flex-col gap-3">
            <p className="text-sm text-gray-600 font-medium">{name}</p>
            <div className="flex items-center gap-4">
              <p className="text-md text-gray-500 font-light">
                {currency}
                {price}
              </p>
              <p className="w-10 h-10 font-medium bg-gray-50 cursor-pointer border border-gray-200 text-[12px] text-black flex items-center justify-center">
                {requiredSize}
              </p>
            </div>
          </div>
        </div>
        <input
          type="number"
          value={quantity}
          min="1"
          max="10"
          className="w-[100px] text-gray-500 outline-none border border-gray-400 px-2 py-1"
          onChange={(e) => handleQuantity(e, item, requiredSize)}
        />
        <div onClick={() => handleDelete(item,requiredSize)}>
          <img
            src={assets.bin_icon}
            alt="trash-icon"
            className="w-5 cursor-pointer"
          />
        </div>
      </div>
      <hr className="border border-gray-300 my-5" />
    </>
  );
};

export default CartProduct;
