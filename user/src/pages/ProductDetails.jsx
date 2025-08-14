import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import { useParams } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import Product from "../components/Product";

const ProductDetails = () => {
  const { id } = useParams();

  const [fetchProduct, setFetchProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  const { currency, addToCart, products } = useGlobalContext();

  useEffect(() => {
    setFetchProduct(products.find((product) => product._id === id));
  }, [id, products]);

  useEffect(() => {
    fetchProduct &&
      setRelatedProducts(
        products
          .filter((item) =>
            item.name.includes(fetchProduct?.name?.split(" ").at(-2))
          )
          .slice(0, 5)
      );
  }, [fetchProduct]);

  if (!fetchProduct || Object.keys(fetchProduct).length === 0) {
    return <p className="p-10 w-full text-center text-gray-600 text-xl">Loading product details...</p>;
  }

  let { name, image, price, sizes, description } = fetchProduct;

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20 flex flex-col gap-20">
      <div className="py-8 flex justify-between gap-10">
        <div className="left-section w-1/2 flex gap-4 ">
          <div className="product-images flex flex-col gap-2">
            {image?.map((pic, index) => (
              <img key={index} src={pic} alt="image" className="w-30" />
            ))}
          </div>
          <div className="">
            <img src={image?.[0]} alt="image" className="min-w-[480px]" />
          </div>
        </div>
        <div className="right-section flex flex-col gap-8 w-1/2">
          <div className="title-rating">
            <p className="text-3xl text-black font-medium">{name}</p>
            <p>ratings</p>
          </div>
          <p className="text-2xl text-black font-medium">
            {currency}
            {price}
          </p>
          <p className="text-sm text-gray-600 w-3/4">{description}</p>
          <div className="sizes">
            <p className="text-md text-gray-600 mb-5">Select Size</p>
            <div className="size-btns flex flex-row gap-5">
              {sizes?.map((size, index) => (
                <button
                  key={index}
                  className={`w-12 h-12 font-medium bg-gray-50 cursor-pointer border ${
                    selectedSize === size ? "border-red-300" : "border-gray-200"
                  } text-[12px] text-black`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button
            className="w-[180px] py-4 bg-black text-white text-[10px] cursor-pointer font-light active:bg-gray-700 transition-all"
            onClick={() => addToCart(fetchProduct, selectedSize)}
          >
            ADD TO CART
          </button>
          <hr className="border border-gray-300" />
          <div className="product-policy mt-[-15px] text-xs text-gray-500 leading-relaxed">
            <p>100% Original product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      <div className="reviews text-[12px]">
        <div className="tabs flex font-bold">
          <p className="text-gray-600 px-7 py-4 border border-gray-300 ">
            Description
          </p>
          <p className="text-gray-600 px-7 py-4 border border-gray-300">
            Reviews(122)
          </p>
        </div>
        <div className="text-gray-600 p-12 border border-gray-300  flex flex-col gap-7 ">
          <p>
            This e-commerce website is a modern and user-friendly online
            platform designed to showcase and sell a variety of products to
            customers. It features a clean layout, easy navigation, and visually
            appealing product displays. Users can browse products, view detailed
            descriptions and images, and add items to their cart for purchase.
          </p>
          <p>
            The website offers a smooth and convenient shopping experience
            across both desktop and mobile devices. With responsive design,
            quick load times, and intuitive navigation, users can easily search,
            filter, and purchase products anytime, anywhere. It ensures
            accessibility and ease for all types of shoppers.
          </p>
        </div>
        <div className="related my-20">
          <SectionTitle firstText="RELATED" secondText="PRODUCTS" />
          <div className="products flex gap-5 mt-10">
            {relatedProducts?.map((item) => (
              <Product key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
