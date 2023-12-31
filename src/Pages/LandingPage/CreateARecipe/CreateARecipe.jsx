import { Link } from "react-router-dom";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import "./CreateARecipe.css";
import useSingleUser from "../../../hooks/useSingleUser";

const CreateARecipe = () => {
  const { currentUser } = useSingleUser();
  return (
    <div className="text-colorOne py-16 md:py-28 rounded-3xl overflow-hidden grid place-items-center">
      <div className="">
        <h1 className="text-[7rem] leading-[6rem] tracking-tight -ml-1 md:text-9xl ">
          Share your cooking carisma
        </h1>
        <p className="ml-1 text-2xl">
          <Link to={currentUser?.role === "admin" ? "" : "/addrecipe"}>
            <button>
              Create a recipe{" "}
              <span className="transition-all duration-500">
                <EastOutlinedIcon />
              </span>
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateARecipe;
