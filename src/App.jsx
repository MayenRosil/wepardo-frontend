import SignInSide from "./routes/login";
import Home from "./routes/home";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  
  import Root from "./routes/root";
import Logs from "./routes/logs";
import Employees from "./routes/employees";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
    {
        path: '/signin',
        element: <SignInSide />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/logs',
        element: <Logs />
    },
    {
        path: '/employees',
        element: <Employees />
    }
  ]);

export function App() {

    return (
        <RouterProvider router={router} />
    )
}