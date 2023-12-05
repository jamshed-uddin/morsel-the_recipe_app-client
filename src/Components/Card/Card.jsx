import { Link } from "react-router-dom";
import forkSpoon from "../../../src/assets/images/forkSpoon.png";
import "./Card.css";

const Card = ({ itemType, item, index }) => {
  /*
   *itemType here is recipe/blog.did toLowerCase cause it may come in uppercase.
   *item is an individual item. it can be blog or recipe.
   *itemId is the unique id of each item(recipe/blog).But in savedItem the unique itemId stored in item property.so the item field can be populated with that particular item by the id.
   */

  return (
    <div className={`${index === 0 ? "firstChild" : ""}`}>
      <Link
        to={
          itemType?.toLowerCase() === "recipe"
            ? `/recipe/detail/${item?._id}`
            : `/blog/detail/${item?._id}`
        }
      >
        {/* images */}
        <div
          className={`w-full h-[17rem] md:h-[22rem]  ${
            index === 0 ? "firstChild-innerDiv" : ""
          } ${
            itemType?.toLowerCase() === "blog" ? "rounded-none" : "rounded-2xl"
          }  relative overflow-hidden`}
        >
          <img
            className={`w-full h-full object-cover  object-center ${
              itemType?.toLowerCase() === "blog" ? "" : "rounded-2xl"
            }`}
            src={
              (itemType?.toLowerCase() === "blog" &&
                (item?.previewImage || forkSpoon)) ||
              (itemType?.toLowerCase() === "recipe" &&
                (item?.recipeImages?.at(0) || forkSpoon))
            }
            alt=""
          />
        </div>

        {/* other info */}
        <div className="">
          <div className="text-colorTwo mt-3">
            {itemType?.toLowerCase() === "recipe" ? (
              <h2 className="text-2xl leading-5 font-medium">
                {item?.recipeName}
              </h2>
            ) : (
              <h2 className="text-2xl leading-5 font-medium">{item?.title}</h2>
            )}
            <>
              {itemType?.toLowerCase() === "recipe" && (
                <div
                  className={`${
                    index === 0 ? "ingredientMinute" : ""
                  } text-lg mt-1 sm:flex items-center sm:gap-4 leading-5 md:leading-normal`}
                >
                  <p>{`${item?.ingredients?.length} ingredients`}</p>
                  <p>{`${item?.prepTime?.minutes} minutes`}</p>
                </div>
              )}
            </>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
