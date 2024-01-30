import { Link, useLocation, useParams } from "react-router-dom";
import Title from "../Components/Title";

const RecipeCategory = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  const { category } = useParams();

  return (
    <div className="my-container text-colorTwo">
      <div>
        {" "}
        <h1 className="text-xl font-light">
          <Link to={"/recipes"}>{pathname.split("/").at(1)}</Link> /{" "}
          <Link to={"/recipes"}>{pathname.split("/").at(2)}</Link> /{" "}
          <Link to={`/recipes/category/${category}`}>
            {" "}
            {pathname.split("/").at(3)}
          </Link>
        </h1>
      </div>
      <div>
        <div className="my-5">
          <Title>{category.charAt(0).toUpperCase() + category.slice(1)} </Title>
        </div>

        <div>Recipes of category {category}</div>
      </div>
    </div>
  );
};

export default RecipeCategory;
