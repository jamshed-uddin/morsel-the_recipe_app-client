import { Link } from "react-router-dom";
import forkSpoon from "../../../public/images/forkSpoon.png";

const Card = ({ itemType, item }) => {
  return (
    <div>
      <Link>
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
                (item?.recipeImages || forkSpoon))
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
