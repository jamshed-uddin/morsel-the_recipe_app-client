import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Toolbar from "@mui/material/Toolbar";

import { useEffect, useState } from "react";
import DashboardDataProvider from "../../providers/DashboardDataProvider";
import { HomeOutlined } from "@mui/icons-material";

const drawerWidth = 240;

const AdminDashboard = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [routes] = useState([
    "overview",
    "manageUsers",
    "manageRecipes",
    "manageBlogs",
  ]);
  const [topBarText, setTopBarText] = useState("");

  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // for setting the top bar/ app bar text
  useEffect(() => {
    if (location.pathname === "/dashboard/overview") {
      return setTopBarText("Overview");
    }
    if (location.pathname === "/dashboard/manageUsers") {
      return setTopBarText("Manage users");
    }
    if (location.pathname === "/dashboard/manageRecipes") {
      return setTopBarText("Manage recipes");
    }
    if (location.pathname === "/dashboard/manageBlogs") {
      return setTopBarText("Manage blogs");
    }
    if (location.pathname === "/dashboard/adminAccount") {
      return setTopBarText("Account");
    }
  }, [location]);

  const drawer = (
    <div className="px-4 pt-3 mt-12 ">
      <Divider />
      <ul className="space-y-4">
        {["Overview", "Manage users", "Manage recipes", "Manage blogs"].map(
          (text, index) => (
            <li className="" key={text}>
              <p onClick={handleDrawerToggle} className="text-xl">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-colorTwo flex items-center rounded-lg bg-opacity-10 gap-5 pl-2 w-full py-1"
                      : " flex items-center gap-5  pl-2 w-full py-1"
                  }
                  to={`/dashboard/${routes.at(index)}`}
                >
                  <span>
                    {index === 0 && <BarChartOutlinedIcon />}
                    {index === 1 && <PeopleAltOutlinedIcon />}
                    {index === 2 && <RestaurantOutlinedIcon />}
                    {index === 3 && <EditNoteOutlinedIcon />}
                  </span>
                  {text}
                </NavLink>
              </p>
            </li>
          )
        )}
      </ul>
      <Divider />
      <ul className="">
        <li className="my-4">
          <p onClick={handleDrawerToggle} className="text-xl ">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-colorTwo flex items-center rounded-lg bg-opacity-10 gap-5 pl-2 w-full py-1"
                  : " flex items-center gap-5  pl-2 w-full py-1"
              }
              to={`/dashboard/adminAccount`}
            >
              <span>
                <PersonOutlineOutlinedIcon />
              </span>
              Account
            </NavLink>
          </p>
        </li>
        <li className="my-4">
          <p className="text-xl pl-2">
            <Link className="w-full" to={"/"}>
              <HomeOutlined />
              <span className="ml-5">Home</span>
            </Link>
          </p>
        </li>
      </ul>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="text-colorTwo ">
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            background: "#fdfbf8",
            color: "inherit",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <p className="text-2xl">{topBarText}</p>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{
            bgcolor: "red",
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            minHeight: "100vh",
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <DashboardDataProvider>
            <Outlet />
          </DashboardDataProvider>
        </Box>
      </Box>
    </div>
  );
};

AdminDashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default AdminDashboard;
