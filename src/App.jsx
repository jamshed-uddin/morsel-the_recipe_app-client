import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";

import Footer from "./Components/Footer/Footer";
import { Toaster } from "react-hot-toast";

// import { useState } from "react";

function App() {
  const location = useLocation();

  const routesWithoutNav = [
    "/account/overview",
    "/account/manageUsers",
    "/account/manageRecipes",
    "/account/manageBlogs",
    "/account/adminAccount",
  ];

  const hideNav = routesWithoutNav.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen ">
      <Toaster />
      {!hideNav && (
        <div>
          <Navbar />
        </div>
      )}
      <div className="flex-grow">
        <Outlet />
      </div>
      {!hideNav && (
        <div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
