import { Link } from "react-router-dom";
import "./Banner.css";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import MyButton from "../../../Components/Button/MyButton";

const Banner = () => {
  return (
    <div className=" relative mb-3">
      <div className="text-colorOne ">
        <div className=" font-semibold">
          <p className="block md:inline text-[7rem] leading-[7rem] md:text-9xl ">
            Cook
          </p>
          <p className="block md:inline  text-[7rem] leading-[7rem] md:text-9xl md:ml-20">
            Share
          </p>
          <p className="block md:inline-block  text-[7rem] leading-[7rem] md:text-9xl ">
            Inspire
          </p>
          <p className="block md:inline w-fit cursor-pointer text-xl ml-2 md:ml-6  hover:space-x-3 ">
            <Link>Explore more</Link>{" "}
            <span className="transition-all duration-500">
              <EastOutlinedIcon />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
