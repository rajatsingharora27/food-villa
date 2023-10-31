import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import About from "./pages/About/About";
import ShopPage from "./pages/CommonShopPage/ShopPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import ErrorPage from "./pages/Error/ErrorPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <About /> },
    { path: "/shop/:type", element: <ShopPage /> },
    { path: "/product/:id", element: <ProductPage /> },
    { path: "/shopping-cart", element: <ShoppingCart /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "*", element: <ErrorPage /> },
  ]);

  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={appRouter} />
      </Provider>
    </div>
  );
};

export default Body;
