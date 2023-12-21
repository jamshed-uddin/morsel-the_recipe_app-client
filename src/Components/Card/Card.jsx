import { Link } from "react-router-dom";
import "./Card.css";
import cardThumb from "../../assets/images/spoon3.jpg";

const Card = ({ itemType, item, placedIn }) => {
  /*
   *itemType here is recipe/blog.did toLowerCase cause it may come in uppercase.
   *item is an individual item. it can be blog or recipe.
   *itemId is the unique id of each item(recipe/blog).But in savedItem the unique itemId stored in item property.so the item field can be populated with that particular item by the id.
   */

  return (
    <div id="card">
      <Link
        to={
          itemType?.toLowerCase() === "recipe"
            ? `/recipe/detail/${item?._id}`
            : `/blog/detail/${item?._id}`
        }
      >
        {/* images */}
        <div
          id="image-container"
          className={`w-full select-none h-[20rem] md:h-[23rem] ${
            itemType?.toLowerCase() === "blog" ? "rounded-none " : "rounded-2xl"
          }  relative overflow-hidden`}
        >
          <img
            className={`w-full h-full object-cover  object-center ${
              itemType?.toLowerCase() === "blog" ? "" : "rounded-2xl"
            } `}
            src={
              (itemType?.toLowerCase() === "blog" &&
                (item?.previewImage || cardThumb)) ||
              (itemType?.toLowerCase() === "recipe" &&
                (item?.recipeImages?.at(0) || cardThumb))
            }
            alt=""
          />

          {/* in the cook something quick section showed the easy or quick based on the number of ingredients and preptime */}
          {placedIn === "cookQuick" && itemType === "recipe" && (
            <p className=" text-colorOne text-sm md:text-lg font-semibold absolute top-1 left-1 space-x-1">
              {item?.ingredients.length <= 7 && (
                <span className="bg-bgColor px-2 md:px-4 py-[0.15rem] md:py-1 rounded-xl">
                  Quick
                </span>
              )}
              {item?.prepTime?.minutes <= 20 && (
                <span className="bg-bgColor px-2 md:px-4 py-[0.15rem] md:py-1 rounded-xl">
                  Easy
                </span>
              )}
            </p>
          )}
        </div>

        {/* other info */}
        <div className="">
          <div className="text-colorTwo mt-3 pl-1">
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
                  className={` text-sm md:text-lg mt-1 flex items-center gap-2 md:gap-4 leading-5 md:leading-normal`}
                >
                  <p>{`${item?.ingredients?.length} ingredients`}</p>
                  <p>
                    {parseInt(item?.cookTime?.minutes) +
                      parseInt(item?.prepTime?.minutes)}{" "}
                    minutes
                  </p>
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
