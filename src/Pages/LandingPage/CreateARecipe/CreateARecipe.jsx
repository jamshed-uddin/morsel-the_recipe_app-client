import { Link } from "react-router-dom";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import "./CreateARecipe.css";
import useSingleUser from "../../../hooks/useSingleUser";
import image from "../../../assets/images/startCooking2.jpg";

const CreateARecipe = () => {
  const { currentUser } = useSingleUser();
  return (
    <div className="text-colorOne my-6  md:h-[calc(100vh-5rem)] w-full overflow-hidden md:flex items-center gap-8 relative">
      <div className="md:w-1/2 ">
        <img
          className="object-cover rounded-2xl md:rounded-nonead"
          src={image}
          alt="Image of a person preparing for cooking"
        />
      </div>
      <div className="md:w-1/2 absolute md:static bottom-1 left-2">
        <h1 className="text-6xl md:text-8xl text-bgColor md:text-colorOne">
          Share your cooking carisma
        </h1>

        <Link to={currentUser?.role === "admin" ? "" : "/addrecipe"}>
          <p className="ml-1 text-bgColor md:text-colorOne  text-xl md:text-2xl hover:space-x-3 transition-all duration-700">
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
