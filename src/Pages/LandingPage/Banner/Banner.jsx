import { Link } from "react-router-dom";
import "./Banner.css";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";

const Banner = () => {
  return (
    <div className=" my-container ">
      <div className="w-full">
        <h1 className="text-colorOne text-[23vw] lg:text-[16vw] font-bold relative z-10 md:leading-[16rem] select-none">
          MORSEL
        </h1>
        <h1 className="lg:text-center ml-2 text-colorOne font-semibold w-[45%] lg:w-full">
          Recipes from different culture around the world of all culture
        </h1>
        <img
          className=" w-52 md:w-[22rem] lg:w-80  absolute top-0 right-0 rounded-bl-3xl"
          src="https://i.ibb.co/CMW27Zb/food3.jpg"
          alt=""
        />
      </div>
      <div className="w-full ">
        <div className="md:flex items-center gap-2 mt-20 lg:mt-0  pt-10">
          <img
            className="w-64 md:w-64 lg:w-80 rounded-2xl"
            src="https://i.ibb.co/fFTBbRW/food1.jpg
"
            alt=""
          />

          <div className="text-colorTwo">
            <h1 className="font-semibold text-2xl lg:text-4xl  w-fit">Gyoza</h1>
            <p className="text-2xl font-light leading-6 lg:pt-4 lg:pb-2  w-[90%] lg:w-[60%] ">
              While gyoza are a mainstay at Japanese restaurants, these
              Japanesedumplings are easy and fun to make at home...
            </p>
            <Link className="text-2xl">Get the recipe</Link>

            {/* <div className="space-y-2 w-fit">
              <div className="w-12 h-[8px] border-[2px] border-[#F31559] rounded-[6px] "></div>
              <div className="w-12 h-[8px] border-[2px] border-[#F31559] rounded-[6px] "></div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="text-colorTwo text-center leading-3">
        <SouthOutlinedIcon sx={{ fontSize: 20 }} className=" animate-bounce" />
        <span className="block font-light ">SCROLL</span>
      </div>
    </div>
  );
};

export default Banner;
