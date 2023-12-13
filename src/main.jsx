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

import AuthProvider from "./providers/AuthProvider.jsx";
import RecipeDetail from "./Components/RecipeDetail/RecipeDetail.jsx";
import BlogDetail from "./Components/BlogDetail/BlogDetail.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import PasswordReset from "./Pages/Login/PasswordReset.jsx";
import Overview from "./Pages/AdminDashboard/Overview/Overview.jsx";
import ManageUsers from "./Pages/AdminDashboard/ManageUsers/ManageUsers.jsx";
import ManageRecipes from "./Pages/AdminDashboard/ManageRecipes/ManageRecipes.jsx";
import AdminAccount from "./Pages/AdminDashboard/AdminAccount/AdminAccount.jsx";
import ManageBlogs from "./Pages/AdminDashboard/ManageBlogs/ManageBlogs.jsx";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard.jsx";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();
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
        path: "recipe/detail/:id",
        element: <RecipeDetail></RecipeDetail>,
      },
      {
        path: "blogs",
        element: <BlogsPage></BlogsPage>,
      },
      {
        path: "blog/detail/:id",
        element: <BlogDetail></BlogDetail>,
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
        path: "recipe/edit/:id",
        element: <AddRecipe></AddRecipe>,
      },
      {
        path: "addblog",
        element: <AddBlog></AddBlog>,
      },
      {
        path: "blog/edit/:id",
        element: <AddBlog></AddBlog>,
      },
    ],
  },
  {
    path: "signin",
    element: <Login></Login>,
  },
  {
    path: "account/reset/password/:email",
    element: <PasswordReset></PasswordReset>,
  },
  {
    path: "register",
    element: <Registration></Registration>,
  },

  {
    path: "dashboard",
    element: <AdminDashboard></AdminDashboard>,
    children: [
      {
        path: "overview",
        element: <Overview></Overview>,
      },
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "manageRecipes",
        element: <ManageRecipes></ManageRecipes>,
      },
      {
        path: "manageBlogs",
        element: <ManageBlogs></ManageBlogs>,
      },
      {
        path: "adminAccount",
        element: <AdminAccount></AdminAccount>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
