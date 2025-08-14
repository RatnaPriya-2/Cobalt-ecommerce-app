import React from "react";
import { useGlobalContext } from "../context/context";
import { Link } from "react-router-dom";

const Product = ({ item }) => {
  const { currency } = useGlobalContext();
  let { image, name, price, _id: id } = item;
  return (
    <Link
      to={`/productDetails/${id}`}
      className="flex flex-col gap-2 text-gray-700"
      id={id}
    >
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt={name}
          className=" max-w-full hover:scale-110 transition-ease-in-out duration-300 "
        />
      </div>
      <p className="text-xs font-medium">{name}</p>
      <p className="font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default Product;
