import Banner from "./Banner/Banner";
import Blogs from "./Blogs/Blogs";
import CreateARecipe from "./CreateARecipe/CreateARecipe";
import Recipes from "./Recipes/Recipes";
import Trending from "./Trending/Trending";

const LandingPage = () => {
  return (
    <>
      <Banner />
      <div className="my-container">
        <Trending />
        <Recipes />
        <CreateARecipe />
        <Blogs />
      </div>
    </>
  );
};

export default LandingPage;
