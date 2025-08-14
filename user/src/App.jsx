import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import FooterSection from "./components/FooterSection";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
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
      <Outlet />
      <FooterSection />
    </div>
  );
};

export default App;
