import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");

  const handleFormData = (e) => {
    let { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e, navigate) => {
    e.preventDefault();
    try {
      let response = await axios.post(`${url}/api/user/adminLogin`, formData, {
        withCredentials: true,
      });
      let { success, adminToken } = response.data;
      if (success) {
        toast.success("Admin Logged in successfully");
        setToken(adminToken);
        navigate("/add");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = async (navigate) => {
    try {
      let response = await axios.post(
        `${url}/api/user/adminLogout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      let { success } = response.data;
      if (success) {
        toast.success("Admin Logged out successfully");
        setToken("");
        setFormData({ email: "", password: "" });
        navigate("/");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    localStorage.setItem("adminToken", token);
  }, [token]);

  console.log(token);

  const value = {
    handleFormData,
    formData,
    token,
    setToken,
    handleSubmit,
    handleLogout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
