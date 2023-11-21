import { Link } from "react-router-dom";
import "./Banner.css";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";
import bannerImage from "../../../../public/banner.jpg";

const Banner = () => {
  return (
    <div className="my-container flex items-center h-screen relative">
      <div className="text-colorOne font-bold text-9xl absolute ">
        <h1>Cook Share Inspire</h1>
      </div>
    </div>
  );
};

export default Banner;
