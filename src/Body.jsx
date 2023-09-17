import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import About from "./pages/About/About";

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <About /> },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
