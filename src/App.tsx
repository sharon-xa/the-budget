import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import Budget from "./pages/Budget";
import Login from "./pages/Login";
import { loginAction } from "./actions/login"
import { logoutAction } from "./actions/logout";
import { checkAuthLoader, tokenLoader } from "./utils/auth";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    id: "root",
    children: [
      {
        index: true,
        element: <Budget />,
        loader: checkAuthLoader
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "logout",
        action: logoutAction,
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
