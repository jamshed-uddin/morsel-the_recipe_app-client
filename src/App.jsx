import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer.jsx/Footer";
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
    <>
      {!hideNav && <Navbar />}
      <Outlet />
      {!hideNav && <Footer />}
    </>
  );
}

export default App;
