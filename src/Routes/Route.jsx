import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Layouts/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Error from "../Pages/Error";
import ForgetPass from "../Pages/ForgetPass";
import Profile from "../Pages/Profile";
import Private from "../Provider/Private";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/profile",
        Component: () => (
          <Private>
            <Profile />
          </Private>
        ),
      },
      {
        path: '/forget-password',
        Component: ForgetPass,
      },
      {
        path: '*',
        Component: Error,
      },
    ],
    
  },
]);

export default router;