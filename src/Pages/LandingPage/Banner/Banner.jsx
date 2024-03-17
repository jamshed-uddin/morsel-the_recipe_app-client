import { Link } from "react-router-dom";
import "./Banner.css";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import bannerVid from "../../../assets/videos/cooking_570p.mp4";
import { useEffect, useRef } from "react";
import useRecipesBlogsData from "../../../hooks/useRecipesBlogsData";

const Banner = () => {
  const { bannerInView, setBannerInView } = useRecipesBlogsData();
  const bannerRef = useRef(null);
  console.log(bannerInView);

  useEffect(() => {
    const bannerToIntersect = bannerRef.current;

    const handleBannerInView = (entries) => {
      entries.forEach((entry) => {
        setBannerInView(entry.isIntersecting);
      });
    };

    const intObserver = new IntersectionObserver(handleBannerInView, {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    });

    if (bannerToIntersect) {
      intObserver.observe(bannerToIntersect);
    }

    return () => {
      if (bannerToIntersect) {
        intObserver.unobserve(bannerToIntersect);
      }
      setBannerInView(false);
    };
  }, [setBannerInView]);

  return (
    <div ref={bannerRef} className="text-colorOne   select-none  ">
      <div className="relative ">
        <div className="w-full h-[60vh] md:h-screen">
          <video
            src={bannerVid}
            autoPlay
            muted
            loop
            className="w-full h-full  object-cover"
          ></video>
        </div>

        {/* text overlay */}
        <div className="absolute bottom-2 left-3 lg:left-24 text-bgColor text-4xl md:text-8xl font-medium ">
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
