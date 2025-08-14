import React, { useEffect } from "react";
import { useGlobalContext } from "../context/context";
import SectionTitle from "../components/SectionTitle";
import DropDown from "../components/DropDown";
import Product from "../components/Product";
import SeachBar from "../components/SeachBar";

const ProductCollection = () => {
  let {
    isSearchbarVisible,
    filteredProducts,
    setFilteredProducts,
    handleCategories,
    handleSubCategories,
    fetchProducts,
    userToken,
    products,
    filterProducts,
  } = useGlobalContext();

  useEffect(() => {
    if (userToken) fetchProducts();
  }, [userToken]);

  return (
    <>
      {isSearchbarVisible && <SeachBar />}
      <div className="flex flex-col md:flex-row  gap-7 px-4 sm:px-6 md:px-8 lg:px-20 py-4 md:py-10">
        <div className="filter-section flex flex-col gap-4 w-full md:w-1/5">
          <p className="text-[20px] text-gray-600 font-medium">FILTERS</p>
          <div className="categories border-1 border-gray-300 flex flex-col gap-2 p-4 min-w-full">
            <p className="text-[15px] text-gray-600 mb-2 font-medium min-w-[90px]">
              CATEGORIES
            </p>
            <div className="men flex gap-3">
              <input
                type="checkbox"
                value="Men"
                id="men"
                className="w-4"
                onChange={handleCategories}
              />
              <label htmlFor="men" className="text-gray-600">
                Men
              </label>
            </div>
            <div className="men flex gap-3">
              <input
                type="checkbox"
                value="Women"
                id="women"
                className="w-4"
                onChange={handleCategories}
              />
              <label htmlFor="women" className="text-gray-600">
                Women
              </label>
            </div>
            <div className="men flex gap-3">
              <input
                type="checkbox"
                value="Kids"
                id="kids"
                className="w-4"
                onChange={handleCategories}
              />
              <label htmlFor="men" className="text-gray-600">
                Kids
              </label>
            </div>
          </div>
          <div className="types border-1 border-gray-300 flex flex-col gap-2 p-4">
            <p className="text-[15px] text-gray-600 md:mb-2 font-medium min-w-[90px]">
              TYPE
            </p>
            <div className="men flex gap-3">
              <input
                type="checkbox"
                value="Topwear"
                id="topwear"
                className="w-4"
                onChange={handleSubCategories}
              />
              <label htmlFor="topwear" className="text-gray-600">
                Topwear
              </label>
            </div>
            <div className="men flex gap-3">
              <input
                type="checkbox"
                value="Bottomwear"
                id="bottomwear"
                className="w-4"
                onChange={handleSubCategories}
              />
              <label htmlFor="bottomwear" className="text-gray-600">
                Bottomwear
              </label>
            </div>
            <div className="men flex gap-3">
              <input
                type="checkbox"
                value="Winterwear"
                id="winterwear"
                className="w-4"
                onChange={handleSubCategories}
              />
              <label htmlFor="winterwear" className="text-gray-600">
                Winterwear
              </label>
            </div>
          </div>
        </div>
        <div className="right-section flex-1">
          <div className="header flex flex-col-reverse gap-5 md:flex-row justify-between items-center mb-5">
            <SectionTitle firstText="ALL" secondText="PRODUCTS" />
            <DropDown />
          </div>
          <div className="products grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-5">
            {filteredProducts.length <= 0 ? (
              <p className="text-xl text-gray-700 w-full mt-10 text-center">
                No products found...
              </p>
            ) : (
              filteredProducts.map((item, index) => (
                <Product key={index} item={item} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCollection;
