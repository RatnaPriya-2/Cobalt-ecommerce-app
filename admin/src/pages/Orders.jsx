import React from "react";
import { assets } from "../assets/admin_assets/assets.js";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "./Add";
import { useEffect } from "react";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateOrderStatus = async (e, orderId) => {
    try {
      let response = await axios.post(
        `${url}/api/order/updateStatus`,
        { orderId, orderStatus: e.target.value },
        { withCredentials: true }
      );

      if (response.data.success) {
        await fetchAllOrders();

        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      let response = await axios.get(`${url}/api/order/allOrders`, {
        withCredentials: true,
      });
      console.log(response.data);
      if (response.data.success) {
        setAllOrders(response.data.orderList);
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
  useEffect(() => {
    fetchAllOrders();
  }, []);

  console.log(allOrders);

  if (loading) {
    return <p className="p-10 text-lg text-gray-600">Loading...</p>;
  }

  if (allOrders.length <= 0) {
    return <p className="p-10 text-lg text-gray-600">No Orders..</p>;
  } else {
    return (
      <div className="w-full">
        <div className="wrapper text-gray-600 text-sm p-5">
          <p className="text-lg font-medium mb-5">Order Page</p>
          {allOrders &&
            allOrders.map((order, index) => {
              let {
                _id: id,
                paymentStatus: paymentDone,
                paymentMethod,
                userName,
                date,
                address,
                items,
                amount,
                orderStatus,
              } = order;
              return (
                <div key={index} className="border border-gray-300 p-5">
                  <div className="flex justify-between">
                    <p className="text-base font-medium mb-5 text-pink-500">
                      <span className="text-gray-600">Order Id :</span> {id}
                    </p>
                    <p className="text-base font-medium mb-5 text-pink-500 w-1/4">
                      <span className="text-gray-600">Order Status :</span>{" "}
                      {orderStatus}
                    </p>
                  </div>

                  <div className="order   grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-5">
                    <div>
                      <img
                        src={assets.parcel_icon}
                        alt="parcel-icon"
                        className="w-12"
                      />
                    </div>

                    <div className="item-name-address flex flex-col gap-3">
                      <div>
                        {items &&
                          items.map((item, index) => (
                            <p key={index}>
                              {item.name} - {item.requiredSize} -{" "}
                              {item.quantity}
                            </p>
                          ))}
                      </div>

                      <div className="address flex flex-col gap-3">
                        <p className="name">{userName}</p>
                        <p>{address}</p>
                      </div>
                    </div>

                    <div>
                      <p className="mb-3">
                        <span className="text-gray-500 font-light">
                          Items :
                        </span>{" "}
                        {items.length}
                      </p>
                      <p>
                        <span className="text-gray-500 font-light">
                          Method :
                        </span>{" "}
                        {paymentMethod.map((char,i)=>i===0?char.toUpperCase():char.toLowerCase()).join("")}
                      </p>
                      <p>
                        <span className="text-gray-500 font-light">
                          Payment :
                        </span>{" "}
                        {paymentDone}
                      </p>
                      <p>
                        <span className="text-gray-500 font-light">Date :</span>{" "}
                        {new Date(date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p>${amount}</p>
                    </div>
                    <div>
                      <select onChange={(e) => updateOrderStatus(e, order._id)}>
                        <option value="">Update Order Status</option>
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">
                          Out for delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
};

export default Orders;
