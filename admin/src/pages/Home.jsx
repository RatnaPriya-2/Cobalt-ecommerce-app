import React from "react";
import Sidebar from "../components/Sidebar";
import List from "./List";
import { useGlobalContext } from "../context/AdminContext";
import Login from "./Login";
import Add from "./Add";

const Home = () => {
  const { token } = useGlobalContext();
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20">
      {token ? <Add /> : <Login />}
    </div>
  );
};

export default Home;
