import Footer from "../../Components/Footer.jsx/Footer";
import Banner from "./Banner/Banner";
import Blogs from "./Blogs/Blogs";
import Recipes from "./Recipes.jsx/Recipes";

const LandingPage = () => {
  return (
    <div className="">
      <Banner />
      <Recipes />
      <Blogs />
    </div>
  );
};

export default LandingPage;
