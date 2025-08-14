import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import { useGlobalContext } from "../context/context";
import Product from "./Product";

const BestSellers = () => {
  let { products } = useGlobalContext();

  let [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    setBestSellers(products.filter((item) => item.bestSeller).slice(0, 5));
  }, [products]);

  console.log(bestSellers)
  return (
    <div className="my-25 px-4 sm:px-6 md:px-8 lg:px-20">
      <div>
        <SectionTitle firstText="BEST" secondText="SELLERS" />
        <p className="text-center text-gray-600 text-sm my-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis
          molestiae debitis repellat, assumenda
        </p>
        <div className="products-container my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5">
          {bestSellers.map((item, index) => (
            <Product item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
