import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import { useGlobalContext } from "./context/AdminContext";

const App = () => {
  const { token } = useGlobalContext();
  console.log(token);
  return (
    <div className="">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <Navbar />
      <div className="flex  px-4 sm:px-6 md:px-8 lg:px-20">
        {token && <Sidebar />}
        {token === "" ? <Login /> : <Outlet />}
      </div>
    </div>
  );
};

export default App;
