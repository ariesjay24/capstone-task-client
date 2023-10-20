import Home from "./views/Home/Home";
import Dashboard from "./views/Dashboard/Dashboard";
import Project from "./views/Project/Project";
import Task from "./views/Task/Task";
import Login from "./views/Login/Login";
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
    path: "/projects",
    name: "Projects",
    element: <Project />,
  },
  {
    path: "/tasks",
    name: "Task",
    element: <Task />,
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
