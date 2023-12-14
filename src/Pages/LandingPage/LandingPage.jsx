import Footer from "../../Components/Footer.jsx/Footer";
import Banner from "./Banner/Banner";
import Blogs from "./Blogs/Blogs";
import Recipes from "./Recipes/Recipes";
import Trending from "./Trending/Trending";

const LandingPage = () => {
  return (
    <div className="my-container">
      <Banner />
      <Trending />
      <Recipes />
      <Blogs />
    </div>
  );
};

export default LandingPage;
