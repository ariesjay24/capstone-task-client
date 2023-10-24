import Home from "./views/Home/Home";
import ProjectProgress from "./views/ProjectProgress/ProjectProgress";
import UserProject from "./views/UserProject/UserProject";
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
    path: "/project-progress",
    name: "Project Progress",
    element: <ProjectProgress />,
  },
  {
    path: "/user-project",
    name: "Project Users",
    element: <UserProject />,
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
