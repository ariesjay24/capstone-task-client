import React from "react";
import Header from "./Header/header";
import Footer from "./Footer/footer";
import { Routes, Route } from "react-router-dom";
import routes from "../routes";

const index = () => {
  return (
    <div>
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
      </Routes>
      <Footer />
    </div>
  );
};

export default index;
