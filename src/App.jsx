import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";

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
    <>
      {!hideNav && <Navbar />}
      <Outlet />
    </>
  );
}

export default App;
