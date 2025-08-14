import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/AdminContext";

const Login = () => {
  const { handleFormData, handleSubmit, formData } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <div className="w-full grid place-items-center gap-10 px-4 sm:px-6 md:px-8 lg:px-20">
      <form
        onSubmit={(e) => handleSubmit(e, navigate)}
        className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 flex flex-col gap-3 my-35"
      >
        <div className="title flex gap-2 items-center justify-center mb-5">
          <p className="playfair text-3xl text-gray-700 font-medium">Login</p>
          <p className="h-[2px] w-12 bg-gray-500 rounded-full"></p>
        </div>

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

        <button className="w-[140px] mx-auto py-3 bg-black text-sm font-light text-white mt-5 cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
