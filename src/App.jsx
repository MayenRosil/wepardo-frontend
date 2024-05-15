import SignInSide from "./WepardoLogin";
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
        element: <div>Hola</div>
    }
  ]);

export function App() {

    return (
        <RouterProvider router={router} />
    )
}