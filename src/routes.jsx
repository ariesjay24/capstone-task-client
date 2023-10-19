import Home from "./views/Home/Home";
import Dashboard from "./views/Dashboard/Dashboard";
import Login from "./views/Login/Login";
import Profile from "./views/Profile/Profile";
import Registration from "./views/Registration/Register";

export const routes = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
  },

  {
    path: "/profile",
    name: "Profile",
    element: <Profile />,
  },

  {
    path: "/login",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/register",
    name: "Register",
    element: <Registration />,
  },
];

export default routes;
