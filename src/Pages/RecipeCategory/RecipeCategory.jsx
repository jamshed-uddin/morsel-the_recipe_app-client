import { Link, useLocation, useParams } from "react-router-dom";
import Title from "../../Components/Title";
import useGetCategory from "../../hooks/useGetCategory";
import CategoryInfo from "./CategoryInfo";
import RecipesOfCategory from "./RecipesOfCategory";
import ErrorElement from "../../Components/ErrorElement";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";

const RecipeCategory = () => {
  const { pathname } = useLocation();
  const { category } = useParams();
  const {
    data: categoryAndRecipe,
    isLoading: categoryAndRecipeLoading,
    error: categoryAndRecipeError,
    refetch: categoryAndRecipeRefetch,
  } = useGetCategory(`/categoryAndRecipe?category=${category}`);

  if (categoryAndRecipeError) {
    return (
      <ErrorElement
        error={categoryAndRecipeError}
        refetch={categoryAndRecipeRefetch}
      />
    );
  }

  return (
    <div className="my-container text-colorTwo tracking-tight">
      <ReactHelmet
        title={`Category | ${category} - Morsel`}
        descriptionContent={categoryAndRecipe?.category?.description}
      />
      {/* breadcrumbs */}
      <div>
        <h1 className="text-xl font-light">
          <Link to={"/recipes"}>{pathname.split("/").at(1)}</Link> /{" "}
          <Link to={"/recipes/category"}>{pathname.split("/").at(2)}</Link> /{" "}
          <Link to={`/recipes/category/${category}`}>
            {" "}
            {pathname.split("/").at(3)}
          </Link>
        </h1>
      </div>

      {/* category info and recipe */}
      <CategoryInfo
        categoryData={categoryAndRecipe?.category}
        loading={categoryAndRecipeLoading}
      />

      {/* recipes of the category */}
      <div className="mt-8">
        <RecipesOfCategory
          recipes={categoryAndRecipe?.recipeOfCategory}
          recipesLoading={categoryAndRecipeLoading}
          category={category}
        />
      </div>
    </div>
  );
};

export default RecipeCategory;
