import { Link } from "react-router-dom";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import "./CreateARecipe.css";
import useSingleUser from "../../../hooks/useSingleUser";
import image from "../../../assets/images/startCooking2.jpg";

const CreateARecipe = () => {
  const { currentUser } = useSingleUser();
  return (
    <div className="text-colorOne my-6 h-[28rem] rounded-2xl    lg:h-[calc(100vh-5rem)] w-full overflow-hidden md:flex items-center gap-8 relative">
      <div className="w-full md:w-1/2 h-full rounded-2xl overflow-hidden">
        <img
          className="object-cover rounded-2xl h-full w-full"
          src={image}
          alt="Image of a person preparing for cooking"
        />
      </div>
      <div className="md:w-1/2 absolute md:static bottom-1 left-2">
        <h1 className="text-6xl lg:text-8xl text-bgColor md:text-colorOne tracking-tight">
          Compose Your Flavor Symphony
        </h1>

        <Link to={currentUser?.role === "admin" ? "" : "/addrecipe"}>
          <p className="ml-1 text-bgColor md:text-colorOne  text-xl md:text-2xl hover:space-x-3 transition-all duration-700 mt-2">
            <span>Create a recipe</span>{" "}
            <span className="transition-all duration-500">
              <EastOutlinedIcon />
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CreateARecipe;
