import SectionTitle from "../components/SectionTitle";
import { url } from "../context/context";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Orders = () => {
  let [orders, setOrders] = useState([]);

  const fetchOrderData = async () => {
    try {
      let response = await axios.get(`${url}/api/user/orders`, {
        withCredentials: true,
      });
      if (response.data.success) {
        let ordersFetched = response.data.orders;
        console.log(ordersFetched);

        const ordersMapped = ordersFetched.map((order) => {
          return {
            orderId: order._id,
            items: order.items,
            method: order.paymentMethod,
            status: order.paymentStatus,
            orderStatus: order.orderStatus,
            date: new Date(order.date).toLocaleDateString(),
          };
        });
        setOrders(ordersMapped);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  console.log(orders);

  if (orders.length <= 0) {
    return (
      <p className="px-4 sm:px-6 md:px-8 lg:px-20 text-xl text-gray-600 mt-10">
        No orders found
      </p>
    );
  } else {
    return (
      <div className="px-4 sm:px-6 md:px-8 lg:px-20">
        <div className="cart-body">
          <SectionTitle firstText="MY" secondText="ORDERS" />
          <div className="cart-container">
            {orders &&
              orders.map((order, index) => (
                <div
                  key={index}
                  className="order border-b-2 border-b-gray-400 py-5 flex flex-col gap-6"
                >
                  <div className="flex items-center justify-between p-2 bg-pink-100">
                    <p className="text-base text-gray-500 font-light ">
                      <span className="text-gray-700 text-xs font-medium">
                        Order Number
                      </span>
                      :{" "}
                      <span className="text-sm text-pink-500 font-medium">
                        {order.orderId}
                      </span>
                    </p>
                    <div className="track">
                      <button
                        className="font-medium bg-pink-500 cursor-pointer border  text-[12px] text-white flex items-center justify-center px-6 py-2 hover:bg-gray-500  transition-all rounded-full"
                        onClick={() => fetchOrderData()}
                      >
                        Track Order
                      </button>
                    </div>
                  </div>

                  {order.items.map((item) => {
                    let { name, image, requiredSize, price, quantity } = item;
                    return (
                      <div className="product-body flex items-center justify-between ">
                        <div className="product-content flex  gap-4 w-1/3">
                          <div className="product-image">
                            <img src={image[0]} alt={name} className="w-20" />
                          </div>
                          <div className="details flex flex-col gap-3">
                            <p className="text-sm text-gray-600 font-medium">
                              {name}
                            </p>
                            <div className="flex items-center gap-4">
                              <p className="text-sm text-gray-500 font-light">
                                $ {price}
                              </p>
                              <p className="text-sm text-gray-500 font-light">
                                Quantity: {quantity}
                              </p>
                              <p className="text-sm text-gray-500 font-light">
                                Size: {requiredSize}
                              </p>
                            </div>

                            <p className="text-sm text-gray-600 font-medium">
                              Date:{" "}
                              <span className="text-gray-400 font-light">
                                {order.date}
                              </span>
                            </p>
                            <p className="text-sm text-gray-600 font-medium">
                              Payment Method:{" "}
                              <span className="text-gray-400 font-light">
                                {order.method.charAt(0).toUpperCase() +
                                  order.method.slice(1)}
                              </span>
                            </p>
                            <p className="text-sm text-gray-600 font-medium">
                              Payment Status:{" "}
                              <span className="text-gray-400 font-light">
                                {order.status}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="status flex items-center gap-3  w-1/3">
                          <p className="w-3 h-3 rounded-full bg-green-500"></p>
                          <p className="text-sm text-gray-700 font-light">
                            {order.orderStatus}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Orders;
