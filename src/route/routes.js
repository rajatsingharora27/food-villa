import { createBrowserRouter } from "react-router-dom";
import App from "../App";

export const route = createBrowserRouter([{ path: "/", element: <App /> }]);

// {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//   },
