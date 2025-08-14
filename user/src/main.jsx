import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import ProductCollection from "./pages/ProductCollection.jsx";
import Contact from "./pages/Contact.jsx";
import { AppProvider } from "./context/context.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import SignUp from "./pages/SignUpOrLogin.jsx";
import Cart from "./pages/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Orders from "./pages/Orders.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/productCollection",
        element: <ProductCollection />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/productDetails/:id",
        element: <ProductDetails />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/placeOrder",
        element: <PlaceOrder />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/orderSuccess",
        element: <OrderSuccess />,
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
