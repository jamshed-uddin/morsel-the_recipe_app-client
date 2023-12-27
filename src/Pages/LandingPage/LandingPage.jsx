import { Suspense, lazy } from "react";
import Banner from "./Banner/Banner";
// import Blogs from "./Blogs/Blogs";
// import CreateARecipe from "./CreateARecipe/CreateARecipe";
import Recipes from "./Recipes/Recipes";
import Trending from "./Trending/Trending";
const Blogs = lazy(() => import("./Blogs/Blogs"));
const CreateARecipe = lazy(() => import("./CreateARecipe/CreateARecipe"));

const LandingPage = () => {
  return (
    <div className="my-container">
      <Banner />
      <Trending />
      <Recipes />
      <Suspense fallback={<div className="bg-bgColor h-screen"></div>}>
        <CreateARecipe />
        <Blogs />
      </Suspense>
    </div>
  );
};

export default LandingPage;
