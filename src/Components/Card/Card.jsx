import { Link } from "react-router-dom";
import forkSpoon from "../../../src/assets/images/forkSpoon.png";
import "./Card.css";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Card = ({ itemType, item, placedIn }) => {
  const [openFeedback, setOpenFeedback] = useState(false);
  /*
   *itemType here is recipe/blog.did toLowerCase cause it may come in uppercase.
   *item is an individual item. it can be blog or recipe.
   *itemId is the unique id of each item(recipe/blog).But in savedItem the unique itemId stored in item property.so the item field can be populated with that particular item by the id.
   */

  return (
    <div id="card">
      {/* showing the recipe/blog status(pending/approved/denied) in the tab section of account page for the creator  */}
      {placedIn === "account-tab" && (
        <div className="flex justify-end -mb-4 relative z-40 ">
          <div className=" text-white text-lg font-semibold bg-colorOne px-3  rounded-xl flex items-center relative">
            {/* status and toggler */}
            <div className="">
              {item?.status}{" "}
              {/* toggler only available if there is any feedback */}
              {item?.feedback && (
                <span
                  onClick={() => setOpenFeedback((p) => !p)}
                  className={`cursor-pointer `}
                >
                  <ExpandMoreIcon
                    sx={
                      openFeedback ? { rotate: "180deg" } : { rotate: "0deg" }
                    }
                  />
                </span>
              )}
            </div>
            {/* feedback body */}
            <div
              className={`${
                openFeedback
                  ? "absolute -bottom-11 px-2  right-0 bg-colorOne rounded-xl leading-5 font-light block "
                  : "hidden"
              }`}
            >
              {item?.feedback}
            </div>
          </div>
        </div>
      )}

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
            }`}
            src={
              (itemType?.toLowerCase() === "blog" &&
                (item?.previewImage || forkSpoon)) ||
              (itemType?.toLowerCase() === "recipe" &&
                (item?.recipeImages?.at(0) || forkSpoon))
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
