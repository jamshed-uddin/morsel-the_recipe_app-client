import { Link } from "react-router-dom";
import "./Banner.css";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import bannerVid from "../../../assets/videos/cooking_570p.mp4";

const Banner = () => {
  return (
    <div className="text-colorOne overflow-hidden  select-none mt-[3.5rem] ">
      <div className="relative ">
        <div className="w-full max-h-[calc(100vh-3.5rem)] overflow-hidden">
          <video
            src={bannerVid}
            autoPlay
            muted
            loop
            className="w-full object-cover"
          ></video>
        </div>
        <div className="absolute bottom-2 left-2 text-bgColor text-4xl md:text-8xl font-medium ">
          <p className=" ">Cook</p>
          <p className="inline mr-3 md:mr-10">Share</p>
          <p className="inline">Inspire</p>
          <p className="inline w-fit cursor-pointer text-sm md:text-xl ml-3 ">
            <Link to={"/recipes"}>
              <button className="hover:space-x-3">
                <span>Explore recipes</span>{" "}
                <span className="transition-all duration-500">
                  <EastOutlinedIcon />
                </span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
