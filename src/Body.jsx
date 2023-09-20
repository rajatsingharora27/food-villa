import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import About from "./pages/About/About";
import ShopPage from "./pages/CommonShopPage/ShopPage";
import { Provider } from "react-redux";
import store from "./redux/store";

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <About /> },
    { path: "/shop/:type", element: <ShopPage /> },
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
