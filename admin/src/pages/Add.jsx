import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

export const url = import.meta.env.VITE_BACKEND_URL;
const Add = () => {
  const [productFormData, setProductFormData] = useState({
    name: "",
    description: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    category: "",
    subCategory: "",
    price: 0,
    bestSeller: false,
    sizes: [],
  });

  const handleProductFormData = (e) => {
    let { name, value, files, type } = e.target;
    if (type === "file") {
      setProductFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (name === "sizes") {
      setProductFormData((prev) => ({
        ...prev,
        sizes: productFormData.sizes.includes(value)
          ? [...productFormData.sizes.filter((size) => size !== value)]
          : [...productFormData.sizes, value],
      }));
    } else {
      setProductFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBestSeller = (e) => {
    let checked = e.target.checked;
    setProductFormData((prev) => ({ ...prev, bestSeller: checked }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let {
      name,
      description,
      image1,
      image2,
      image3,
      image4,
      category,
      subCategory,
      sizes,
      bestSeller,
      price,
    } = productFormData;
    const fd = new FormData();
    fd.append("name", name);
    fd.append("description", description);
    fd.append("image1", image1);
    fd.append("image2", image2);
    fd.append("image3", image3);
    fd.append("image4", image4);
    fd.append("category", category);
    fd.append("subCategory", subCategory);
    fd.append("sizes", JSON.stringify(sizes));
    fd.append("bestSeller", bestSeller);
    fd.append("price", price);
    try {
      let response = await axios.post(`${url}/api/product/add`, fd, {
        withCredentials: true,
      });
      console.log(response.data);

      if (response.data.success) {
        toast.success("Product added successfully");
        setProductFormData({
          name: "",
          description: "",
          image1: "",
          image2: "",
          image3: "",
          image4: "",
          category: "",
          subCategory: "",
          price: 0,
          bestSeller: false,
          sizes: [],
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log(productFormData);

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="wrapper p-5 flex flex-col gap-4"
        encType="multipart/form-data"
      >
        <div className="upload">
          <p className="text-gray-700 text-md pb-2">Upload Images</p>
          <div className="flex gap-3">
            <label className="image-upload" htmlFor="image1">
              {productFormData.image1 ? (
                <img
                  src={URL.createObjectURL(productFormData.image1)}
                  alt="Preview"
                  className="w-26 cursor-pointer"
                />
              ) : (
                <img
                  src={assets.upload_area}
                  alt="upload-icon"
                  className="w-26 cursor-pointer"
                />
              )}

              <input
                type="file"
                name="image1"
                id="image1"
                hidden
                onChange={handleProductFormData}
              />
            </label>
            <label className="image-upload" htmlFor="image2">
              {productFormData.image2 ? (
                <img
                  src={URL.createObjectURL(productFormData.image2)}
                  alt="Preview"
                  className="w-26 cursor-pointer"
                />
              ) : (
                <img
                  src={assets.upload_area}
                  alt="upload-icon"
                  className="w-26 cursor-pointer"
                />
              )}

              <input
                type="file"
                name="image2"
                id="image2"
                hidden
                onChange={handleProductFormData}
              />
            </label>
            <label className="image-upload" htmlFor="image3">
              {productFormData.image3 ? (
                <img
                  src={URL.createObjectURL(productFormData.image3)}
                  alt="Preview"
                  className="w-26 cursor-pointer"
                />
              ) : (
                <img
                  src={assets.upload_area}
                  alt="upload-icon"
                  className="w-26 cursor-pointer"
                />
              )}

              <input
                type="file"
                name="image3"
                id="image3"
                hidden
                onChange={handleProductFormData}
              />
            </label>
            <label className="image-upload" htmlFor="image4">
              {productFormData.image4 ? (
                <img
                  src={URL.createObjectURL(productFormData.image4)}
                  alt="Preview"
                  className="w-26 cursor-pointer"
                />
              ) : (
                <img
                  src={assets.upload_area}
                  alt="upload-icon"
                  className="w-26 cursor-pointer"
                />
              )}

              <input
                type="file"
                name="image4"
                id="image4"
                hidden
                onChange={handleProductFormData}
              />
            </label>
          </div>
        </div>
        <div className="name flex flex-col gap-2">
          <label className="text-gray-700 text-md ">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={productFormData.name}
            onChange={handleProductFormData}
            required
          />
        </div>
        <div className="description flex flex-col gap-2">
          <label className="text-gray-700 text-md ">Description</label>
          <textarea
            name="description"
            id="description"
            onChange={handleProductFormData}
            value={productFormData.description}
            required
          ></textarea>
        </div>
        <div className="flex gap-3">
          <div className="w-1/3">
            <p className="pb-2 text-gray-700 text-md">Category</p>
            <select
              name="category"
              id="category"
              className="w-full text-xs"
              value={productFormData.category}
              onChange={handleProductFormData}
            >
              <option value="" disabled hidden>
                Select Category
              </option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="w-1/3">
            <p className="pb-2 text-gray-700 text-md">Sub Category</p>
            <select
              name="subCategory"
              id="subCategory"
              className="w-full text-xs"
              onChange={handleProductFormData}
              value={productFormData.subCategory}
            >
              <option value="" disabled hidden>
                Select Sub Category
              </option>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div className="price flex flex-col w-1/3 ">
            <label htmlFor="price" className="pb-2 text-gray-700 text-md">
              Price
            </label>
            <input
              type="number"
              min="0"
              name="price"
              id="price"
              className="w-full text-xs"
              value={productFormData.price}
              onChange={handleProductFormData}
            />
          </div>
        </div>
        <div className="sizes">
          <p className="pb-2 text-gray-700 text-md">Sizes</p>
          <div className="flex gap-3">
            <input
              type="button"
              value="S"
              name="sizes"
              className={`cursor-pointer w-12 h-12 flex items-center justify-center border border-gray-300  text-xs rounded-xs ${
                productFormData.sizes.includes("S")
                  ? "bg-pink-100 "
                  : "bg-slate-100 "
              }`}
              onClick={handleProductFormData}
            />
            <input
              type="button"
              value="M"
              name="sizes"
              className={`cursor-pointer w-12 h-12 flex items-center justify-center border border-gray-300  text-xs rounded-xs ${
                productFormData.sizes.includes("M")
                  ? "bg-pink-100 "
                  : "bg-slate-100 "
              }`}
              onClick={handleProductFormData}
            />
            <input
              type="button"
              value="L"
              name="sizes"
              className={` cursor-pointer w-12 h-12 flex items-center justify-center border border-gray-300  text-xs rounded-xs ${
                productFormData.sizes.includes("L")
                  ? "bg-pink-100 "
                  : "bg-slate-100 "
              }`}
              onClick={handleProductFormData}
            />
            <input
              type="button"
              value="XL"
              name="sizes"
              className={`cursor-pointer w-12 h-12 flex items-center justify-center border border-gray-300  text-xs rounded-xs ${
                productFormData.sizes.includes("XL")
                  ? "bg-pink-100 "
                  : "bg-slate-100 "
              }`}
              onClick={handleProductFormData}
            />
            <input
              type="button"
              value="XXL"
              name="sizes"
              className={`cursor-pointer w-12 h-12 flex items-center justify-center border border-gray-300 text-xs rounded-xs ${
                productFormData.sizes.includes("XXL")
                  ? "bg-pink-100 "
                  : "bg-slate-100 "
              }`}
              onClick={handleProductFormData}
            />
          </div>
        </div>
        <div className="best-seller flex items-center gap-3">
          <input
            type="checkbox"
            name="bestSeller"
            id="bestSeller"
            className=" w-5 h-5"
            onChange={handleBestSeller}
            checked={productFormData.bestSeller}
          />
          <label className="text-gray-700 text-md" htmlFor="bestSeller">
            Add to best seller
          </label>
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-black hover:bg-black/80 text-white w-[150px] cursor-pointer"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
