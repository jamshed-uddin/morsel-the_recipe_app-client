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
import PrivateRoute from "./PrivateRoutes/PrivateRoute.jsx";
import AdminRoute from "./PrivateRoutes/AdminRoute.jsx";
import RecipesAndBlogsProvider from "./providers/recipesAndBlogsProvider.jsx";
import ScrollTop from "./ScrollTop.jsx";

import ErrorPage from "./Pages/ErrorPage.jsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        {/* this scrollTop to prevent a page scrolled down when first renders */}
        <ScrollTop />
        <App></App>
      </>
    ),
    errorElement: <ErrorPage />,
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
        element: (
          <PrivateRoute>
            <AddRecipe></AddRecipe>
          </PrivateRoute>
        ),
      },
      {
        path: "recipe/edit/:id",
        element: (
          <PrivateRoute>
            <AddRecipe></AddRecipe>
          </PrivateRoute>
        ),
      },
      {
        path: "addblog",
        element: (
          <PrivateRoute>
            <AddBlog></AddBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "blog/edit/:id",
        element: (
          <PrivateRoute>
            <AddBlog></AddBlog>
          </PrivateRoute>
        ),
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
    element: (
      <PrivateRoute>
        <AdminDashboard></AdminDashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "overview",
        element: (
          <AdminRoute>
            <Overview></Overview>
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manageRecipes",
        element: (
          <AdminRoute>
            <ManageRecipes></ManageRecipes>
          </AdminRoute>
        ),
      },
      {
        path: "manageBlogs",
        element: (
          <AdminRoute>
            <ManageBlogs></ManageBlogs>
          </AdminRoute>
        ),
      },
      {
        path: "adminAccount",
        element: (
          <AdminRoute>
            <AdminAccount></AdminAccount>
          </AdminRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RecipesAndBlogsProvider>
            <RouterProvider router={router}></RouterProvider>
          </RecipesAndBlogsProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
