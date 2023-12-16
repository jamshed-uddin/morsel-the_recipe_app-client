import { Link } from "react-router-dom";
import "./Banner.css";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";

const Banner = () => {
  return (
    <div className="text-colorOne    overflow-hidden rounded-3xl select-none">
      <div className="font-semibold mt-10 -ml-1">
        <p className="block md:inline text-[7rem] leading-[7rem] md:text-9xl ">
          Cook
        </p>
        <p className="block md:inline  text-[7rem] leading-[7rem] md:text-9xl md:ml-20">
          Share
        </p>
        <p className="block  text-[7rem] leading-[7rem] md:text-9xl ">
          Inspire
        </p>
        <p className="block md:inline w-fit cursor-pointer text-2xl ml-3  hover:space-x-3 ">
          <Link to={"/recipes"}>
            <button>
              Explore recipes{" "}
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

export default Banner;
