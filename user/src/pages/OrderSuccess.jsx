import { useEffect, useRef, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { url, useGlobalContext } from "../context/context";

const OrderSuccess = () => {
  const location = useLocation();
  const { paymentMethod } = location.state || {};
  const { setCartProducts } = useGlobalContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const tempOrderId = searchParams.get("tempOrder");

  const [verifyOrderStatus, setVerifyOrderStatus] = useState(null); // null = loading, true = success, false = error

  const navigate = useNavigate();

  const calledRef = useRef(false); //  stays the same between renders

  useEffect(() => {
    if (paymentMethod !== "razorpay") {
      setVerifyOrderStatus(true); // If not razorpay, set status to true
      setCartProducts([]); // Clear cart products
      return; // Skip verification for non-razorpay payments
    }
    if (calledRef.current) return; //  prevents running twice
    calledRef.current = true;

    const verifyOrder = async () => {
      try {
        let response = await axios.post(
          `${url}/api/user/verifyOrder`,
          { tempOrderId },
          { withCredentials: true }
        );

        if (response.data.success) {
          setCartProducts([]);
          toast.success(response.data.message);
          setVerifyOrderStatus(true);
        } else {
          toast.error(response.data.message);
          setVerifyOrderStatus(false);
          navigate("/placeOrder");
        }
      } catch (error) {
        toast.error(error.message);
        setVerifyOrderStatus(false);
        navigate("/placeOrder");
      }
    };

    verifyOrder();
  }, [setCartProducts, tempOrderId, paymentMethod]);

  // Redirect to orders page after 5 seconds
  // This is to give the user time to see the success message before redirecting

  useEffect(() => {
    let timer;
    if (verifyOrderStatus) {
      timer = setTimeout(() => {
        navigate("/orders");
      }, 5000);
    } else {
      timer = setTimeout(() => {
        navigate("/placeOrder");
      }, 5000);
    }
    () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [verifyOrderStatus]);

  if (verifyOrderStatus === null) {
    return (
      <div className="w-full p-20">
        <p className="text-2xl text-center">Verifying your order...</p>
      </div>
    );
  }

  if (verifyOrderStatus) {
    return (
      <div className="w-full p-20 ">
        <div className="w-max mx-auto flex items-center gap-5">
          <img className="h-20" src={assets.check_mark} alt="check-mark" />
          <p className=" text-2xl">Order Placed Successfully</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full p-20 ">
        <div className="w-max mx-auto flex items-center gap-5">
          <img className="h-20" src={assets.cross_icon} alt="cross-mark" />
          <p className="p-20 text-2xl">Error placing order</p>
        </div>
      </div>
    );
  }
};

export default OrderSuccess;
