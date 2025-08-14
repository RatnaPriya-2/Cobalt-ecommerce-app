import React, { useEffect, useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { url } from "./Add";
import { toast } from "react-toastify";

const List = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let response = await axios.get(`${url}/api/product/listAllProducts`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setProductList(response.data.products);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      let response = await axios.post(
        `${url}/api/product/remove`,
        { id },
        { withCredentials: true }
      );
      if (response.data.success) {
        await fetchProducts();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="p-10 text-lg text-gray-600">Loading...</p>;
  }

  return (
    <div className="w-full p-5">
      <div className="list">
        <p className="text-lg pb-4">All Products List</p>
        <div className="w-full">
          <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] text-center bg-gray-100 p-2 border-b">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          <div className="py-2">
            {productList.map((product, index) => {
              let { image, name, category, price, _id } = product;
              return (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] py-2 place-items-center text-center"
                >
                  <img
                    src={image[0]}
                    alt="product-image"
                    className="w-18 mx-auto"
                  />
                  <p>{name}</p>
                  <p>{category}</p>
                  <p>${price}</p>
                  <img
                    src={assets.bin_icon}
                    alt="bin-icon"
                    className="w-5 mx-auto cursor-pointer"
                    onClick={() => handleDeleteProduct(_id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
