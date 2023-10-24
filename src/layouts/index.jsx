import React from "react";
import Header from "./Header/header";
import Footer from "./../layouts/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import routes from "../routes";
import TaskManager from "../views/Task/Task";

const index = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={route.element}
              exact
            />
          );
        })}
        <Route path="/projects/:projectId/tasks" element={<TaskManager />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default index;
