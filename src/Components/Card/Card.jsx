import { Link } from "react-router-dom";
import forkSpoon from "../../../src/assets/images/forkSpoon.png";

const Card = ({ itemType, item }) => {
  /*
   *itemType here is recipe/blog.did toLowerCase cause it may come in uppercase.
   *item is an individual item. it can be blog or recipe.
   *itemId is the unique id of each item(recipe/blog).But in savedItem the unique itemId stored in item property.so the item field can be populated with that particular item by the id.
   */

  return (
    <div>
      <Link
        to={
          itemType?.toLowerCase() === "recipe"
            ? `/recipe/detail/${item?._id}`
            : `/blog/detail/${item?._id}`
        }
      >
        {/* images */}
        <div
          className={`w-full h-[22rem]  ${
            itemType?.toLowerCase() === "blog" ? "" : "rounded-2xl"
          }  relative overflow-hidden`}
        >
          <img
            className={`w-full h-full  object-cover  ${
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
          <div className="text-colorTwo mt-4">
            {itemType?.toLowerCase() === "recipe" ? (
              <h2 className="text-2xl leading-5 font-medium">
                {item?.recipeName}
              </h2>
            ) : (
              <h2 className="text-2xl leading-5 font-medium">{item?.title}</h2>
            )}
            <>
              {itemType?.toLowerCase() === "recipe" && (
                <div className={`space-x-4 text-lg mt-1`}>
                  <span>{`${item?.ingredients?.length} ingredients`}</span>
                  <span>{`${item?.prepTime?.minutes} minutes`}</span>
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
