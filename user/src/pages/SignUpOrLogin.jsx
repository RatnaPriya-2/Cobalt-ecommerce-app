import { useState } from "react";
import SubscribeSection from "../components/SubscribeSection";
import useSignup from "../hooks/useSignup";
import { url, useGlobalContext } from "../context/context";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignUpOrLogin = () => {
  const navigate = useNavigate();
  const { formData, handleFormData, setFormData } = useSignup();
  const { setUserToken, state, setState, getCartData } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (state === "Sign Up") {
        response = await axios.post(`${url}/api/user/register`, formData, {
          withCredentials: true,
        });
      } else {
        response = await axios.post(`${url}/api/user/login`, formData, {
          withCredentials: true,
        });
      }

      if (response.data.success) {
        setUserToken(response.data.userToken);
        localStorage.setItem("userToken", response.data.userToken);
        setFormData({
          name: "",
          email: "",
          password: "",
        });

        toast.success(response.data.message);

        navigate("/");
        // Fetch cart **after a slight delay**, giving browser time to set cookies
        setTimeout(async () => {
          try {
            await getCartData(); // cookie now attached automatically
          } catch (err) {
            console.error(err);
          }
        }, 1000); // 50ms is usually enough
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full min-h-screen grid place-items-center gap-10 px-4 sm:px-6 md:px-8 lg:px-20">
      <form
        onSubmit={handleSubmit}
        className="body w-full sm:w-3/4 md:w-1/2 lg:w-1/3 flex flex-col gap-3 my-35"
      >
        <div className="title flex gap-2 items-center justify-center mb-5">
          <p className="playfair text-3xl text-gray-700 font-medium">
            {state === "Login" ? "Login" : "Sign Up"}
          </p>
          <p className="h-[2px] w-12 bg-gray-500 rounded-full"></p>
        </div>
        {state === "Sign Up" && (
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            name="name"
            required
            className="text-gray-700 border-2 border-gray-500 px-5 py-2 placeholder:text-xs placeholder:text-gray-500 outline-none"
            onChange={handleFormData}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          name="email"
          required
          className="text-gray-700 border-2 border-gray-500 px-5 py-2 placeholder:text-xs placeholder:text-gray-500 outline-none"
          onChange={handleFormData}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          name="password"
          required
          className="text-gray-700 border-2 border-gray-500 px-5 py-2 placeholder:text-xs placeholder:text-gray-500 outline-none"
          onChange={handleFormData}
        />
        {state === "Sign Up" && (
          <div className="text-xs text-gray-700 flex gap-3 font-medium">
            <p className="cursor-pointer">Already have an account? </p>
            <p
              className="cursor-pointer underline hover:text-pink-600 transition-all"
              onClick={() => setState("Login")}
            >
              Login
            </p>
          </div>
        )}
        {state === "Login" && (
          <div className="text-xs text-gray-700 flex justify-between font-medium">
            <p className="cursor-pointer">Forgot your password?</p>
            <p
              className="cursor-pointer underline hover:text-pink-600 transition-all"
              onClick={() => setState("Sign Up")}
            >
              Create Account
            </p>
          </div>
        )}
        <button className="w-[140px] mx-auto py-3 bg-black text-sm font-light text-white mt-5 cursor-pointer">
          {state === "Login" ? "Login" : "Create"}
        </button>
      </form>

      <SubscribeSection />
    </div>
  );
};

export default SignUpOrLogin;
