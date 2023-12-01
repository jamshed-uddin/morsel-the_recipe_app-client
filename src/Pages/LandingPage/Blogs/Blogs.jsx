import { useEffect, useRef, useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import "./Blogs.css";
import Card from "../../../Components/Card/Card";
import { useQuery } from "react-query";
import CardSkeleton from "../../../Components/CardSkeleton";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const { isLoading, isError, data, error } = useQuery(
    "blogs",
    async () => {
      const result = axios.get(`${import.meta.env.VITE_BASEURL}allBlogs`);
      return result;
    },
    {
      onSuccess: (data) => {
        setBlogs(data.data);
      },
    }
  );
  console.log(blogs);

  return (
    <div className=" my-container pt-14">
      <h1 className="text-5xl font-semibold text-colorOne mb-4">
        Morsel voices
      </h1>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5">
        {[1, 2, 3, 4, 5].map((el, index) =>
          isLoading ? (
            <CardSkeleton key={index} />
          ) : (
            <Card itemType="blog" key={index}></Card>
          )
        )}
      </div>
    </div>
  );
};

export default Blogs;
