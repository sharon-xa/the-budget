import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import Budget from "./pages/Budget";
import History from "./pages/History";
import Login from "./pages/Login";
import { action as loginAction } from "./pages/Login"
import { action as logoutAction } from "./pages/Logout";
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
        path: "history",
        element: <History />,
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