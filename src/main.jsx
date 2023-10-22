import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeMain from "./Pages/HomeMain/HomeMain.jsx";
import Login from "./Pages/Login/Login.jsx";

import RecipesPage from "./Pages/RecipesPage/RecipesPage.jsx";
import BlogsPage from "./Pages/BlogsPage/BlogsPage.jsx";
import AccountPage from "./Pages/AccountPage/AccountPage.jsx";
import Registration from "./Pages/Register/Registration.jsx";
import AddRecipe from "./Pages/AddRecipe/AddRecipe.jsx";
import AddBlog from "./Pages/AddBlog/AddBlog.jsx";
import BlogBody from "./Pages/AddBlog/BlogBody.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <HomeMain></HomeMain>,
      },

      {
        path: "recipes",
        element: <RecipesPage></RecipesPage>,
      },
      {
        path: "blogs",
        element: <BlogsPage></BlogsPage>,
      },
      {
        path: "account",
        element: <AccountPage></AccountPage>,
      },
      {
        path: "addrecipe",
        element: <AddRecipe></AddRecipe>,
      },
      {
        path: "addblog",
        element: <AddBlog></AddBlog>,
      },
    ],
  },
  {
    path: "signin",
    element: <Login></Login>,
  },
  {
    path: "register",
    element: <Registration></Registration>,
  },
  {
    path: "blogBody",
    element: <BlogBody></BlogBody>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
