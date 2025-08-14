import SectionTitle from "../components/SectionTitle";
import { url, useGlobalContext } from "../context/context";
import { assets } from "../assets/frontend_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PlaceOrder = () => {
  const { currency, cartProducts, setCartProducts, cartPrice, shippingFee } =
    useGlobalContext();
  let totalPrice = cartPrice + shippingFee;
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    paymentMethod: "",
    totalPrice: totalPrice,
  });

  const handleOrderDetails = (e) => {
    let { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let {
      firstName,
      lastName,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
      paymentMethod,
      totalPrice,
    } = orderDetails;

    let address = [street, city, state, zipcode, country, phone].join(",");
    let userName = firstName + " " + lastName;
    let finalData = {
      address,
      userName,
      totalPrice,
      paymentMethod,
      items: cartProducts,
    };

    switch (paymentMethod) {
      case "cod":
        try {
          let response = await axios.post(
            `${url}/api/user/placeOrderCod`,
            { finalData },
            { withCredentials: true }
          );
          if (response.data.success) {
            setCartProducts([]);
            toast.success(response.data.message);
            navigate("/orderSuccess", {
              state: {
                paymentMethod: "cod",
              },
            });
          } else {
            console.log(response.data.message);
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error.message);
          toast.error(error.message);
        }

        break;
      case "stripe":
        try {
          let response = await axios.post(
            `${url}/api/user/placeOrderStripe`,
            { finalData },
            { withCredentials: true }
          );
          console.log(response.data);

          if (response.data.success) {
            setCartProducts([]);
            toast.success(response.data.message);
            window.location.href = response.data.sessionUrl;
          } else {
            console.log(response.data.message);
            toast.error(response.data.message);
            navigate("/placeOrder");
          }
        } catch (error) {
          console.log(error.message);
          toast.error(error.message);
        }
        break;

      case "razorpay":
        try {
          let response = await axios.post(
            `${url}/api/user/placeOrderRazorpay`,
            { finalData },
            { withCredentials: true }
          );

          if (response.data.success) {
            const { orderId, orderAmount, razorpayKey } = response.data;

            const options = {
              key: razorpayKey,
              amount: orderAmount,
              currency: "INR",
              name: "Cobalt Ecommerce",
              description: "Order Payment",
              order_id: orderId,
              handler: async (res) => {
                try {
                  const verifyResponse = await axios.post(
                    `${url}/api/user/verifyRazorpayPayment`,
                    {
                      orderId: res.razorpay_order_id,
                      paymentId: res.razorpay_payment_id,
                      signature: res.razorpay_signature,
                    },
                    { withCredentials: true }
                  );

                  if (verifyResponse.data.success) {
                    setCartProducts([]);
                    navigate("/orderSuccess", {
                      state: {
                        paymentMethod: "razorpay",
                        tempOrderId: verifyResponse.data.tempOrderId,
                      },
                    });
                  } else {
                    toast.error(verifyResponse.data.message);
                    navigate("/placeOrder");
                  }
                } catch (error) {
                  console.error("Payment Verification Error:", error);
                  toast.error("Payment verification failed. Please try again.");
                }
              },
              theme: { color: "#3399cc" },
            };

            // ✅ Open Razorpay checkout
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
          } else {
            toast.error(response.data.message);
            navigate("/placeOrder");
          }
        } catch (error) {
          console.error(error.message);
          toast.error("Something went wrong while placing the order.");
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-20">
      <form
        onSubmit={placeOrder}
        className="main-body w-full flex justify-between mb-50"
      >
        <div className="left-section w-1/2">
          <div className="flex">
            <SectionTitle firstText="DELIVERY" secondText="INFORMATION" />
          </div>

          <div className=" text-gray-600 flex flex-col gap-5 w-3/4">
            <div className="flex flex-row justify-between gap-3">
              <input
                type="text"
                name="firstName"
                value={orderDetails.firstName}
                placeholder="First Name"
                required
                onChange={handleOrderDetails}
                className="text-sm text-gray-600 outline-none border-2 border-gray-300 w-1/2 p-2 placeholder:text-xs rounded-[3px]"
              />
              <input
                type="text"
                name="lastName"
                value={orderDetails.lastName}
                placeholder="Last Name"
                required
                onChange={handleOrderDetails}
                className="text-sm text-gray-600 outline-none border-2 border-gray-300 w-1/2 p-2 placeholder:text-xs rounded-[3px]"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={orderDetails.email}
              required
              onChange={handleOrderDetails}
              className="text-sm text-gray-600 outline-none border-2 border-gray-300 w-full p-2 placeholder:text-xs rounded-[3px]"
            />
            <input
              type="text"
              name="street"
              placeholder="street"
              value={orderDetails.street}
              required
              onChange={handleOrderDetails}
              className="text-sm text-gray-600 outline-none border-2 border-gray-300 w-full p-2 placeholder:text-xs rounded-[3px]"
            />
            <div className="flex flex-row justify-between gap-3">
              <input
                type="text"
                name="city"
                value={orderDetails.city}
                placeholder="City"
                required
                onChange={handleOrderDetails}
                className="text-sm text-gray-600 outline-none border-2 border-gray-300 w-1/2 p-2 placeholder:text-xs rounded-[3px]"
              />
              <input
                type="text"
                name="state"
                value={orderDetails.state}
                placeholder="State"
                required
                onChange={handleOrderDetails}
                className="text-sm text-gray-600 outline-none border-2 border-gray-300 w-1/2 p-2 placeholder:text-xs rounded-[3px]"
              />
            </div>
            <div className="flex flex-row justify-between gap-3">
              <input
                type="text"
                name="zipCode"
                value={orderDetails.zipCode}
                placeholder="Zip code"
                required
                onChange={handleOrderDetails}
                className="text-sm text-gray-600 outline-none border-2 border-gray-300 w-1/2 p-2 placeholder:text-xs rounded-[3px]"
              />
              <input
                type="text"
                name="country"
                value={orderDetails.country}
                placeholder="Country"
                required
                onChange={handleOrderDetails}
                className="text-sm text-gray-600 outline-none border-2 border-gray-300 w-1/2 p-2 placeholder:text-xs rounded-[3px]"
              />
            </div>
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              value={orderDetails.phone}
              required
              onChange={handleOrderDetails}
              className="text-sm text-gray-600 outline-none border-2 border-gray-300 w-full p-2 placeholder:text-xs rounded-[3px]"
            />
          </div>
        </div>
        <div className="right-section w-1/2 flex justify-end mt-5">
          <div className="w-4/5">
            <div className="flex">
              <SectionTitle firstText="CART" secondText="TOTALS" />
            </div>

            <div className="flex justify-end ">
              <div className="cart-total w-full ">
                <div className="content text-sm text-gray-600 w-full ">
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
                    <p className="text-lg text-gray-700 font-medium">Total</p>
                    <p className="text-lg text-gray-700 font-medium">
                      {totalPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-md  flex flex-col justify-end">
              <div className="flex gap-3 text-md items-center mt-10 mb-6">
                <p className="text-gray-600">
                  PAYMENT{" "}
                  <span className="text-gray-800 font-semibold ">METHODS</span>
                </p>
                <p className="h-[2px] w-12 bg-gray-500 rounded-full"></p>
              </div>

              <div className="payment-methods flex justify-between gap-3">
                <div className="px-3 py-2 border border-gray-300 flex gap-2 items-center flex-1">
                  <input
                    type="radio"
                    className="w-4"
                    id="stripe"
                    name="paymentMethod"
                    value="stripe"
                    onChange={handleOrderDetails}
                  />
                  <label htmlFor="stripe">
                    <img
                      src={assets.stripe_logo}
                      alt="stripe-logo"
                      className="w-12"
                    />
                  </label>
                </div>
                <div className="px-3 py-2 border border-gray-300 flex gap-2 items-center flex-1">
                  <input
                    type="radio"
                    className="w-4"
                    id="razorpay"
                    name="paymentMethod"
                    value="razorpay"
                    onChange={handleOrderDetails}
                  />
                  <label htmlFor="razorpay">
                    <img
                      src={assets.razorpay_logo}
                      alt="stripe-logo"
                      className="w-22"
                    />
                  </label>
                </div>
                <div className="px-3 py-2 border border-gray-300 flex gap-2 items-center flex-1">
                  <input
                    type="radio"
                    className="w-4"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    onChange={handleOrderDetails}
                  />
                  <label htmlFor="cod" className="text-[11px] text-gray-500">
                    CASH ON DELIVERY
                  </label>
                </div>
              </div>
              <div className="w-full flex justify-end mt-10">
                <button
                  type="submit"
                  className="px-12 py-3 text-sm bg-black text-white  cursor-pointer font-light hover:bg-black/80 transition-all"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
