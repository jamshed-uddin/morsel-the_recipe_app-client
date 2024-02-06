import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";
import AllCategories from "../RecipesPage/AllCategories";

const CategoryPage = () => {
  return (
    <div className="my-container">
      <ReactHelmet
        title={"Categories - Morsel"}
        descriptionContent={
          "Explore different categories and recipes of each categories."
        }
      />
      <AllCategories placedIn={"categoryPage"}></AllCategories>
    </div>
  );
};

export default CategoryPage;
