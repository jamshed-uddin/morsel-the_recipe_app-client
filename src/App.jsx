import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { lazy } from "react";
// import Footer from "./Components/Footer/Footer";
const Footer = lazy(() => import("./Components/Footer/Footer"));

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

  // const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return <div className="h-screen bg-bgColor"></div>;
  // }

  return (
    <div className="flex flex-col min-h-screen ">
      {!hideNav && (
        <div>
          {" "}
          <Navbar />
        </div>
      )}
      <div className="flex-grow">
        {" "}
        <Outlet />
      </div>
      {!hideNav && (
        <div>
          {" "}
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
