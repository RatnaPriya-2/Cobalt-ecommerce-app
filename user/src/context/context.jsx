import { createContext, useContext, useEffect, useState } from "react";

import useSignup from "../hooks/useSignup";
import { toast } from "react-toastify";
import axios from "axios";

const AppContext = createContext();
export const url = import.meta.env.VITE_BACKEND_URL;

const AppProvider = ({ children }) => {
  const currency = "$";
  let shippingFee = 10;

  const [selectedOption, setSelectedOption] = useState(
    <>
      <span className="text-gray-500">Sort by:</span> Relevant
    </>
  );

  const [products, setProducts] = useState([]);
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") || ""
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sortValue, setSortValue] = useState("relavant");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [state, setState] = useState("Sign Up");

  const [cartProducts, setCartProducts] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);

  const fetchProducts = async () => {
    try {
      let response = await axios.get(`${url}/api/user/listAllProducts`, {
        withCredentials: true,
      });

      if (response.data.success) {
        console.log("Products from backend:", response.data);
        setProducts(response.data.products);
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  console.log("Backend URL is:", import.meta.env.VITE_BACKEND_URL);

  const getCartData = async () => {
    try {
      let response = await axios.get(`${url}/api/cart/getCartData`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setCartProducts(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const addToCart = async (item, size) => {
    if (size === null) {
      toast.error("Select size");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/cart/add`,
        { item, size },
        { withCredentials: true }
      );

      if (response.data.success) {
        //  Backend confirmed success — now update frontend state

        const isAlreadyAdded = cartProducts.find(
          (product) => product._id === item._id && product.requiredSize === size
        );

        if (isAlreadyAdded) {
          setCartProducts((prev) =>
            prev.map((product) =>
              product._id === item._id && product.requiredSize === size
                ? { ...product, quantity: product.quantity + 1 }
                : product
            )
          );
          toast.success("Product already in cart, quantity increased by 1");
        } else {
          setCartProducts((prev) => [
            ...prev,
            { ...item, quantity: 1, requiredSize: size },
          ]);
          toast.success(response.data.message);
        }
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleQuantity = async (e, item, requiredSize) => {
    let quantity = e.target.value;
    try {
      let response = await axios.post(
        `${url}/api/cart/update`,
        { quantity, item, requiredSize },
        { withCredentials: true }
      );

      if (response.data.success) {
        setCartProducts((prev) =>
          prev.map((pro) =>
            pro._id === item._id && pro.requiredSize === requiredSize
              ? { ...pro, quantity: quantity }
              : pro
          )
        );
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleDelete = async (item, requiredSize) => {
    try {
      let response = await axios.post(
        `${url}/api/cart/delete`,
        { item, requiredSize },
        { withCredentials: true }
      );
      if (response.data.success) {
        setCartProducts((prev) =>
          prev.filter((product) =>
            product._id === item._id
              ? product.requiredSize !== requiredSize
              : product
          )
        );
        toast.success(response.data.message);
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {}
  };

  const handleDropdown = (option) => {
    setShowDropdown(!showDropdown);
    setSelectedOption(option.label);
    setSortValue(option.value);
  };

  const handleCategories = (e) => {
    let selectedCategory = e.target.value;

    if (categories.includes(selectedCategory)) {
      setCategories((prev) =>
        prev.filter((category) => category !== selectedCategory)
      );
    } else {
      setCategories((prev) => [...prev, selectedCategory]);
    }
  };
  const handleSubCategories = (e) => {
    let selectedSubCategory = e.target.value;

    if (subCategories.includes(selectedSubCategory)) {
      setSubCategories((prev) =>
        prev.filter((category) => category !== selectedSubCategory)
      );
    } else {
      setSubCategories((prev) => [...prev, selectedSubCategory]);
    }
  };

  const filterProducts = () => {
    let productsCopy = [...products];

    if (searchTerm) {
      productsCopy = productsCopy.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }
    if (categories.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        categories.includes(product.category)
      );
    }
    if (subCategories.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        subCategories.includes(product.subCategory)
      );
    }

    switch (sortValue) {
      case "low":
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case "high":
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      case "relavant":
        productsCopy = productsCopy;
        break;

      default:
        break;
    }
    setFilteredProducts(productsCopy);
  };

  useEffect(() => {
    if (!userToken) {
      localStorage.removeItem("userToken");
    } else {
      localStorage.setItem("userToken", userToken);
    }
  }, [userToken]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, categories, subCategories, sortValue]);

  useEffect(() => {
    setCartPrice(
      cartProducts.reduce((acc, val) => acc + val.price * val.quantity, 0)
    );
  }, [cartProducts]);

  const value = {
    currency,
    showDropdown,
    setShowDropdown,
    selectedOption,
    setSelectedOption,
    handleDropdown,
    isSearchbarVisible,
    setIsSearchbarVisible,
    searchTerm,
    setSearchTerm,
    filteredProducts,
    fetchProducts,
    setCategories,
    setSubCategories,
    handleCategories,
    handleSubCategories,
    cartProducts,
    setCartProducts,
    addToCart,
    handleQuantity,
    handleDelete,
    shippingFee,
    cartPrice,
    products,
    userToken,
    setUserToken,
    state,
    setState,
    getCartData,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
