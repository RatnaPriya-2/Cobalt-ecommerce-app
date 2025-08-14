import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const useSignup = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormData = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return { formData, handleFormData, setFormData };
};
export default useSignup;
