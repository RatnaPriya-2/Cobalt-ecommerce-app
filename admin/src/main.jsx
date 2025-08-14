import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Orders from "./pages/Orders.jsx";
import List from "./pages/List.jsx";
import Add from "./pages/Add.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { AppProvider } from "./context/AdminContext.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/list",
        element: <List />,
      },
      {
        path: "/add",
        element: <Add />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
