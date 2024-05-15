import SignInSide from "./routes/login";
import Home from "./routes/home";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  
  import Root from "./routes/root";
  
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
    }
  ]);

export function App() {

    return (
        <RouterProvider router={router} />
    )
}