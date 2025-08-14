import React from "react";
import SectionTitle from "../components/SectionTitle";
import { useGlobalContext } from "../context/context";
import CartProduct from "../components/CartProduct";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Cart = () => {
  let {
    cartProducts,
    shippingFee,
    currency,
    cartPrice,
    userToken,
    getCartData,
  } = useGlobalContext();

  const navigate = useNavigate();

 

  

  if (cartProducts.length <= 0) {
    return (
      <p className="px-4 sm:px-6 md:px-8 lg:px-20 text-xl text-gray-600 mt-10">
        Your cart is empty
      </p>
    );
  } else {
    return (
      <div className="px-4 sm:px-6 md:px-8 lg:px-20">
        <div className="cart-body">
          <SectionTitle firstText="YOUR" secondText="CART" />
          <div className="cart-container">
            {cartProducts.map((item, index) => (
              <CartProduct key={index} item={item} />
            ))}
          </div>
          <div className="flex justify-end ">
            <div className="cart-total  w-1/4">
              <SectionTitle firstText="CART" secondText="TOTALS" />
              <div className="content text-xs text-gray-500 w-full ">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>
                    {currency}
                    {cartPrice}
                  </p>
                </div>
                <hr className="border border-gray-200 my-2" />
                <div className="flex justify-between">
                  <p>Shipping Fee</p>
                  <p>
                    {currency}
                    {shippingFee}
                  </p>
                </div>
                <hr className="border border-gray-200 my-2" />
                <div className="flex justify-between">
                  <p className="text-sm text-gray-700 font-medium">Total</p>
                  <p className="text-sm text-gray-700 font-medium">
                    {cartPrice + shippingFee}
                  </p>
                </div>
              </div>
              <div
                className="w-full flex justify-end mt-10"
                onClick={() => navigate("/placeOrder")}
              >
                <button className="px-6 py-3 text-[10px] bg-black text-white  cursor-pointer font-light hover:bg-black/80 transition-all">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Cart;
