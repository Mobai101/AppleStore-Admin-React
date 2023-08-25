import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home, { homeLoader } from "./pages/Home";
import Root, { rootLoader } from "./pages/Root";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Logout from "./pages/Logout";
import Protect, { protectLoader } from "./pages/Protect";
import HistoryDetail from "./pages/HistoryDetail";
import ProductsPage from "./pages/ProductsPage";
import NewProduct from "./pages/NewProduct";
import EditProduct, { editProductLoader } from "./pages/EditProduct";
import Customer, { customerLoader } from "./pages/Customer";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "/",
        id: "protect",
        element: <Protect />,
        loader: protectLoader,
        children: [
          {
            index: true,
            element: <Home />,
            loader: homeLoader,
          },
          {
            path: "history/detail/:orderId",
            element: <HistoryDetail />,
          },
          {
            path: "products",
            element: <ProductsPage />,
          },
          {
            path: "products/new",
            element: <NewProduct />,
          },
          {
            path: "products/edit/:productId",
            element: <EditProduct />,
            loader: editProductLoader,
          },
        ],
      },
      {
        path: "customer",
        element: <Customer />,
        loader: customerLoader,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
