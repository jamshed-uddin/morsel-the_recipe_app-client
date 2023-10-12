import { useEffect, useRef, useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import "./Blogs.css";
import Card from "../../../Components/Card/Card";

const Blogs = () => {
  const scrollRef = useRef(null);
  const scrollableElRef = useRef(null);
  // console.log(scrollableElRef);
  const [scrollPosition, setScrollPosition] = useState({ left: 0, right: 7 });

  // console.log(scrollRef);
  console.log(scrollPosition);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    const scrollObserver = () => {
      if (scrollElement) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollElement;

        const scrollRight = Math.floor(scrollWidth - clientWidth - scrollLeft);

        setScrollPosition({
          ...scrollPosition,
          left: scrollLeft,
          right: scrollRight,
        });
      }
    };

    if (scrollElement) {
      scrollElement.addEventListener("scroll", scrollObserver);
    }

    return () => {
      if (scrollElement) {
        scrollObserver;
        scrollElement.removeEventListener("scroll", scrollObserver);
      }
    };
  }, [scrollPosition]);

  const scrollToLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 300;
    }
  };

  const scrollToRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 300;
    }
    console.log("clicked", scrollRef.current.scrollRight);
  };

  return (
    <div className="min-h-screen  my-container relative">
      <div className="mb-6">
        <h1 className="text-8xl font-bold text-colorOne tracking-tight">
          MORSEL VOICES
        </h1>
        <p className="text-3xl font-light  text-colorTwo">
          Techniques, tips and stories
        </p>
      </div>
      <div
        ref={scrollRef}
        id="container"
        className=" overflow-x-scroll w-full  scroll-smooth"
      >
        {/* right scroll button */}
        <div
          onClick={scrollToRight}
          className={`
           px-2 py-3 rounded-lg bg-colorOne text-white absolute top-[50%] -right-5 cursor-pointer ${
             scrollPosition.right < 5 && "hidden"
           }`}
        >
          <ArrowForwardIosOutlinedIcon />
        </div>
        {/* left scroll button */}
        <div
          onClick={scrollToLeft}
          className={` w-fit px-2 py-3 rounded-lg bg-colorOne text-white absolute top-[50%] -left-5 cursor-pointer ${
            scrollPosition.left < 5 && "hidden"
          }`}
        >
          <ArrowBackIosOutlinedIcon />
        </div>
        <div ref={scrollableElRef} className="lg:flex gap-3 w-max ">
          {[1, 2, 3, 4, 5, 6].map((el, index) => (
            <Card key={index}></Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
